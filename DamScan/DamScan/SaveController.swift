import SwiftUI
import Foundation

class SaveController : UIViewController, UIPickerViewDelegate, UIPickerViewDataSource, UITextFieldDelegate {
    var mainController: MainController!
    
    private let dismissViewButton: UIButton = {
        let button = UIButton(type: .system)
        button.setBackgroundImage(.init(systemName: "x.circle.fill"), for: .normal)
        button.tintColor = .red
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    } ()
    
    private let imageView: UIImageView = {
        let image = UIImage(systemName: "arrow.up.doc")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private let saveCurrentScanLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.textColor = .damBlue
        return label
    }()
    
    private let fileNameLabel: UILabel = {
        let label = UILabel()
        label.text = "Filename:"
        label.textAlignment = .right
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    } ()
    
    private var fileName: UITextView = {
        let textView = UITextView()
        textView.text = "Building-Room"
        textView.font = .boldSystemFont(ofSize: 18)
        textView.textColor = .damBlue
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    private var buildingData: [String] = [
        "Select building...",
        "Kelley Engineering Center",
        "Johnson Hall"
    ]
    
    private var locationDict = [
        "Select building...": ["Select room..."],
        "Kelley Engineering Center": ["Select room...", "1001", "1002", "1003"],
        "Johnson Hall": ["Select room...", "101", "102"]
    ]
    
    private var roomList = [String]()
    private var selectedBuilding = "Select building..."
    private var selectedRoom = "Select room..."
    
    private let buildingPicker = UIPickerView()
    private let roomPicker = UIPickerView()
    
    private let buildingInputLabel: UILabel = {
        let label = UILabel()
        label.text = "Building:"
        label.textAlignment = .right
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    } ()
    
    private let buildingTextField: UITextField = {
        let textField = UITextField()
        textField.text = "Select building..."
        textField.textColor = .lightGray
        textField.textAlignment = .left
        textField.layer.borderWidth = 1.0
        textField.layer.cornerRadius = 10.0
        let paddingView = UIView(frame: CGRect(x: 0, y: 0, width: 10, height: textField.frame.height))
        textField.leftView = paddingView
        textField.leftViewMode = .always
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    } ()
    
    private let roomInputLabel: UILabel = {
        let label = UILabel()
        label.text = "Room:"
        label.textAlignment = .right
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    } ()
    
    private let roomTextField: UITextField = {
        let textField = UITextField()
        textField.text = "Select room..."
        textField.textColor = .lightGray
        textField.textAlignment = .left
        textField.layer.borderWidth = 1.0
        textField.layer.cornerRadius = 10.0
        let paddingView = UIView(frame: CGRect(x: 0, y: 0, width: 10, height: textField.frame.height))
        textField.leftView = paddingView
        textField.leftViewMode = .always
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    } ()
    
    private let toolBar: UIToolbar = {
        let toolBar = UIToolbar()
        toolBar.barStyle = .default
        toolBar.isTranslucent = true
        toolBar.tintColor = UIColor(red: 92/255, green: 216/255, blue: 255/255, alpha: 1)
        toolBar.sizeToFit()
        toolBar.isUserInteractionEnabled = true
        toolBar.translatesAutoresizingMaskIntoConstraints =  false
        return toolBar
    } ()
    
    private let submitButton: UIButton = {
        let button = UIButton(type: .system)
        button.tintColor = .white
        button.layer.cornerRadius = 15
        button.backgroundColor = .damBlue
        button.setTitle("SUBMIT SCAN", for: .normal)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 18)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let spinner: UIActivityIndicatorView = {
        let indicator = UIActivityIndicatorView(style: .large)
        indicator.color = .white
        indicator.backgroundColor = .clear
        indicator.hidesWhenStopped = true
        indicator.translatesAutoresizingMaskIntoConstraints = false
        return indicator
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        
        dismissViewButton.addTarget(self, action: #selector(dismissView), for: .touchUpInside)
        view.addSubview(dismissViewButton)
        
        view.addSubview(imageView)
        saveCurrentScanLabel.attributedText = NSMutableAttributedString(string: "Current Scan: \(mainController.renderer.highConfCount) points", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 16)])
        view.addSubview(saveCurrentScanLabel)
        view.addSubview(fileNameLabel)
        view.addSubview(fileName)
        
        view.addSubview(toolBar)
        let doneButton = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(doneClick(sender:)))
        let spaceButton = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        let cancelButton = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(cancelClick(sender:)))
        toolBar.setItems([cancelButton, spaceButton, doneButton], animated: false)
        
        view.addSubview(buildingInputLabel)
        buildingTextField.delegate = self
        buildingTextField.addTarget(self, action: #selector(buildingTextSelected), for: .touchDown)
        buildingTextField.inputView = buildingPicker
        buildingTextField.inputAccessoryView = toolBar
        view.addSubview(buildingTextField)
        
        view.addSubview(roomInputLabel)
        roomTextField.delegate = self
        roomTextField.addTarget(self, action: #selector(roomTextSelected), for: .touchDown)
        roomTextField.inputView = roomPicker
        roomTextField.inputAccessoryView = toolBar
        view.addSubview(roomTextField)
        
        buildingPicker.delegate = self
        buildingPicker.dataSource = self
        buildingPicker.translatesAutoresizingMaskIntoConstraints =  false
        
        roomPicker.delegate = self
        roomPicker.dataSource = self
        roomPicker.translatesAutoresizingMaskIntoConstraints =  false
        
        submitButton.addTarget(self, action: #selector(executeUpload), for: .touchUpInside)
        view.addSubview(submitButton)
        view.addSubview(spinner)
        
        NSLayoutConstraint.activate([
            dismissViewButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 25),
            dismissViewButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 25),
            dismissViewButton.widthAnchor.constraint(equalToConstant: 50),
            dismissViewButton.heightAnchor.constraint(equalToConstant: 50),
            
            imageView.topAnchor.constraint(equalTo: view.topAnchor, constant: 125),
            imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 175),
            imageView.heightAnchor.constraint(equalToConstant: 200),
            
            saveCurrentScanLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            saveCurrentScanLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor),
            
            fileNameLabel.topAnchor.constraint(equalTo: saveCurrentScanLabel.bottomAnchor, constant: 36),
            fileNameLabel.widthAnchor.constraint(equalToConstant: 115),
            fileNameLabel.heightAnchor.constraint(equalToConstant: 45),
            fileName.topAnchor.constraint(equalTo: saveCurrentScanLabel.bottomAnchor, constant: 40),
            fileName.leftAnchor.constraint(equalTo: fileNameLabel.rightAnchor, constant: 14),
            
            buildingInputLabel.topAnchor.constraint(equalTo: fileName.bottomAnchor, constant: 10),
            buildingInputLabel.widthAnchor.constraint(equalToConstant: 115),
            buildingInputLabel.heightAnchor.constraint(equalToConstant: 45),
            
            buildingTextField.topAnchor.constraint(equalTo: fileName.bottomAnchor, constant: 10),
            buildingTextField.leftAnchor.constraint(equalTo: buildingInputLabel.rightAnchor, constant: 10),
            buildingTextField.widthAnchor.constraint(equalToConstant: 220),
            buildingTextField.heightAnchor.constraint(equalToConstant: 45),
            
            roomInputLabel.topAnchor.constraint(equalTo: buildingTextField.bottomAnchor, constant: 15),
            roomInputLabel.widthAnchor.constraint(equalToConstant: 115),
            roomInputLabel.heightAnchor.constraint(equalToConstant: 45),
            
            roomTextField.topAnchor.constraint(equalTo: buildingTextField.bottomAnchor, constant: 15),
            roomTextField.leftAnchor.constraint(equalTo: buildingInputLabel.rightAnchor, constant: 10),
            roomTextField.widthAnchor.constraint(equalToConstant: 220),
            roomTextField.heightAnchor.constraint(equalToConstant: 45),

            spinner.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            submitButton.topAnchor.constraint(equalTo: roomTextField.bottomAnchor, constant: 50),
            submitButton.widthAnchor.constraint(equalToConstant: 175),
            submitButton.heightAnchor.constraint(equalToConstant: 50),
            submitButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        ])
    }
    
    @objc func dismissView() {
        self.dismiss(animated: true, completion: nil)
    }
    
    // MARK: - Picker functionality
    func setRoomsList(building: String) {
        self.roomList = locationDict[building]!
    }
    
    func refreshFileName() {
        var building = String(selectedBuilding.split(separator: " ")[0])
        var room = String(selectedRoom.split(separator: " ")[0])
        if (selectedBuilding == "Select building...") {
            building = "Building"
            room = "Room"
        }
        if (selectedRoom == "Select room...") {
            room = "Room"
        }
        fileName.text = building + "-" + room
    }
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    @objc func buildingTextSelected() {
        roomTextField.isUserInteractionEnabled = false
    }
    
    @objc func roomTextSelected() {
        buildingTextField.isUserInteractionEnabled = false
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        if pickerView == buildingPicker {
            return buildingData.count
        } else {
            let selectedRow = buildingPicker.selectedRow(inComponent: 0)
            let selectedBuilding = buildingData[selectedRow]
            return locationDict[selectedBuilding]?.count ?? 0
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        if pickerView == buildingPicker {
           return buildingData[row]
        } else {
            let selectedRow = buildingPicker.selectedRow(inComponent: 0)
            let selectedBuilding = buildingData[selectedRow]
            return locationDict[selectedBuilding]?[row] ?? ""
        }
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        if pickerView == buildingPicker {
            if row == 0 {
                buildingTextField.textColor = .lightGray
            } else {
                buildingTextField.textColor = .black
            }
            buildingTextField.text = buildingData[row]
            setRoomsList(building: selectedBuilding)
            self.roomPicker.reloadAllComponents()
            roomPicker.selectRow(0, inComponent: 0, animated: true)
            roomTextField.textColor = .lightGray
            roomTextField.text  = locationDict[selectedBuilding]![0]
        } else {
            roomTextField.text = locationDict[selectedBuilding]![row]
            if row == 0 {
                roomTextField.textColor = .lightGray
            } else {
                roomTextField.textColor = .black
            }
        }
        refreshFileName()
    }
    
    @objc func doneClick(sender: UIBarButtonItem) {
        selectedBuilding = buildingTextField.text!
        selectedRoom = roomTextField.text!
        refreshFileName()
        buildingTextField.isUserInteractionEnabled = true
        roomTextField.isUserInteractionEnabled = true
        buildingTextField.resignFirstResponder()
        roomTextField.resignFirstResponder()
    }
    
    @objc func cancelClick(sender: UIBarButtonItem) {
        if selectedBuilding != buildingTextField.text! {
            let row = buildingData.firstIndex(of: selectedBuilding)!
            buildingPicker.selectRow(row, inComponent: 0, animated: true)
            buildingTextField.text = selectedBuilding
            setRoomsList(building: selectedBuilding)
            if (row == 0) {
                buildingTextField.textColor = .lightGray
            } else {
                buildingTextField.textColor = .black
            }
            self.roomPicker.reloadAllComponents()
        }
        if (selectedRoom != roomTextField.text!) {
            let row = locationDict[selectedBuilding]!.firstIndex(of: selectedRoom)!
            roomPicker.selectRow(row, inComponent: 0, animated: true)
            roomTextField.text = selectedRoom
            if (row == 0) {
                roomTextField.textColor = .lightGray
            } else {
                roomTextField.textColor = .black
            }
        }
        refreshFileName()
        buildingTextField.isUserInteractionEnabled = true
        roomTextField.isUserInteractionEnabled = true
        buildingTextField.resignFirstResponder()
        roomTextField.resignFirstResponder()
    }
    
    // MARK: - Upload functionality
    func onSaveError(error: XError) {
        dismissView()
        mainController.onSaveError(error: error)
    }
    
    private func beforeSave() {
        submitButton.isEnabled = false
        isModalInPresentation = true
    }
    
    private func deleteFile(filePath: URL) {
        do {
            let fileManager = FileManager.default
            // Check if file exists
            if fileManager.fileExists(atPath: filePath.path) {
                // Delete file
                try fileManager.removeItem(atPath: filePath.path)
            } else {
                print("File does not exist")
            }
        }
        catch let error as NSError {
            print("An error took place while attempting to delete a file: \(error)")
        }
    }
        
    @objc func executeUpload() -> Void {
        let unixTime = String(Int(NSDate().timeIntervalSince1970))
        var fileName = fileName.text + "-" + unixTime
        let format = "ascii"
        
        if selectedBuilding == "Select building..." || selectedRoom == "Select room..." {
            fileName = "invalid"
        }
        
        mainController.renderer.saveAsPlyFile(
            fileName: fileName,
            beforeGlobalThread: [beforeSave, spinner.startAnimating],
            afterGlobalThread: [dismissView, spinner.stopAnimating, mainController.afterSave],
            errorCallback: onSaveError,
            format: format)
        
        let filePath = FileManager.default.urls(
            for: .documentDirectory,
            in: .userDomainMask)[0].appendingPathComponent("\(fileName).ply",
            isDirectory: false)
        guard let fileData = try? Data(contentsOf: filePath) else {
            return
        }
        
        let targetURL = "http://128.193.154.224:8888/"

        let request = MultipartFormDataRequest(url: URL(string: targetURL)!)
        request.addDataField(named: "file", data: fileData, mimeType: "application/octet-stream")
        request.addTextField(named: "date", value: unixTime)
        request.addTextField(named: "building", value: selectedBuilding)
        request.addTextField(named: "room", value: selectedRoom)
        request.addTextField(named: "filename", value: fileName)
        
        URLSession.shared.dataTask(with: request.asURLRequest(), completionHandler: { data, response, error in
            guard let data = data,
                let response = response as? HTTPURLResponse,
                error == nil else {                                              // check for fundamental networking error
                print("error", error ?? "Unknown error")
                return
            }

            guard (200 ... 299) ~= response.statusCode else {                    // check for http errors
                print("statusCode should be 2xx, but is \(response.statusCode)")
                print("response = \(response)")
                return
            }

            let responseString = String(data: data, encoding: .utf8)
            print("responseString = \(responseString!)")

        }).resume()
        
        self.deleteFile(filePath: filePath)
    }
}
