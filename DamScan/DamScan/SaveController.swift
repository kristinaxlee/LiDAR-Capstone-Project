//
//  SaveController.swift
//  SceneDepthPointCloud
    
import SwiftUI
import Foundation

class SaveController : UIViewController, UIPickerViewDelegate, UIPickerViewDataSource, UITextFieldDelegate {
    var mainController: MainController!
    private var buildingData: [String] = ["Select building...", "Kelley Engineering Center", "Johnson Hall", "Other Place", "Other Place2"]
    private var locationDict = [
        "Select building...": ["Select building..."],
        "Kelley Engineering Center": ["Select room...", "Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"],
        "Johnson Hall": ["Select room...", "Room 4", "Room 5", "Room 6", "Room 4", "Room 5", "Room 6"],
        "Other Place": ["Select room...", "Room 1", "Room 5", "Room 6", "Room 4", "Room 5", "Room 6"],
        "Other Place2": ["Select room...", "Room 4", "Room 5", "Room 6", "Room 4", "Room 5", "Room 6"]
    ]
    private var roomList = [String]()
    private var selectedBuilding = "Select building..."
    private var selectedRoom = "Select room..."
    private let formatPicker = UIPickerView()
    private let buildingPicker = UIPickerView()
    private let roomPicker = UIPickerView()
    private let spinner = UIActivityIndicatorView(style: .large)
    private let saveCurrentButton = UIButton(type: .system)
    private let saveCurrentScanLabel = UILabel()
    private var exportData = [URL]()
    
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
    
    private let imageSubHeader: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: ".PLY - Ascii Format", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 18)])
        textView.attributedText = attributeText
        textView.textColor = .damBlue
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    private var fileName: UITextView = {
        let textView = UITextView()
        textView.text = "File-Name"
        textView.font = .boldSystemFont(ofSize: 18)
        textView.textColor = .damBlue
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
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
        textField.leftView = paddingView;
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
        textField.text = "Select building..."
        textField.textColor = .lightGray
        textField.textAlignment = .left
        textField.layer.borderWidth = 1.0
        textField.layer.cornerRadius = 10.0
        let paddingView = UIView(frame: CGRect(x: 0, y: 0, width: 10, height: textField.frame.height))
        textField.leftView = paddingView;
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
        return toolBar
    } ()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        
        dismissViewButton.addTarget(self, action: #selector(dismissView), for: .touchUpInside)
        view.addSubview(dismissViewButton)
        
        view.addSubview(imageView)
        view.addSubview(fileName)
        view.addSubview(imageSubHeader)
        
        view.addSubview(toolBar)
        let doneButton = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(doneClick(sender:)))
        let spaceButton = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        let cancelButton = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(doneClick(sender:)))
        toolBar.setItems([cancelButton, spaceButton, doneButton], animated: false)
        
        view.addSubview(buildingInputLabel)
        
        buildingTextField.delegate = self
        buildingTextField.inputView = buildingPicker
        buildingTextField.inputAccessoryView = toolBar
        view.addSubview(buildingTextField)
        
        view.addSubview(roomInputLabel)
        
        roomTextField.delegate = self
        roomTextField.inputView = roomPicker
        roomTextField.inputAccessoryView = toolBar
        view.addSubview(roomTextField)
        
        buildingPicker.delegate = self
        buildingPicker.dataSource = self
        buildingPicker.translatesAutoresizingMaskIntoConstraints =  false
//        buildingPicker.delegate?.pickerView?(buildingPicker, didSelectRow: 0, inComponent: 0)
        
        roomPicker.delegate = self
        roomPicker.dataSource = self
        roomPicker.translatesAutoresizingMaskIntoConstraints =  false
//        roomPicker.delegate?.pickerView?(roomPicker, didSelectRow: 0, inComponent: 0)
        
        saveCurrentScanLabel.text = "Current Scan: \(mainController.renderer.highConfCount) points"
        saveCurrentScanLabel.translatesAutoresizingMaskIntoConstraints = false
        saveCurrentScanLabel.textColor = .damBlue
        view.addSubview(saveCurrentScanLabel)

        spinner.color = .white
        spinner.backgroundColor = .clear
        spinner.hidesWhenStopped = true
        spinner.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(spinner)
        
        saveCurrentButton.tintColor = .white
        saveCurrentButton.layer.cornerRadius = 15
        saveCurrentButton.backgroundColor = .damBlue
        saveCurrentButton.setTitle("SUBMIT SCAN", for: .normal)
        saveCurrentButton.titleLabel?.font = UIFont.boldSystemFont(ofSize: 18)
        saveCurrentButton.translatesAutoresizingMaskIntoConstraints = false
        saveCurrentButton.addTarget(self, action: #selector(executeSave), for: .touchUpInside)
        view.addSubview(saveCurrentButton)
        
        NSLayoutConstraint.activate([
            dismissViewButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 25),
            dismissViewButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 25),
            dismissViewButton.widthAnchor.constraint(equalToConstant: 50),
            dismissViewButton.heightAnchor.constraint(equalToConstant: 50),
            
            imageView.topAnchor.constraint(equalTo: view.topAnchor, constant: 75),
            imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 175),
            imageView.heightAnchor.constraint(equalToConstant: 200),

            imageSubHeader.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: -5),
            imageSubHeader.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            saveCurrentScanLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            saveCurrentScanLabel.bottomAnchor.constraint(equalTo: imageSubHeader.bottomAnchor, constant: 15),
            
            fileName.topAnchor.constraint(equalTo: saveCurrentScanLabel.bottomAnchor, constant: 15),
            fileName.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            buildingInputLabel.topAnchor.constraint(equalTo: fileName.bottomAnchor, constant: 35),
            buildingInputLabel.widthAnchor.constraint(equalToConstant: 110),
            buildingInputLabel.heightAnchor.constraint(equalToConstant: 45),
            
            buildingTextField.topAnchor.constraint(equalTo: fileName.bottomAnchor, constant: 35),
            buildingTextField.leftAnchor.constraint(equalTo: buildingInputLabel.rightAnchor, constant: 10),
            buildingTextField.widthAnchor.constraint(equalToConstant: 225),
            buildingTextField.heightAnchor.constraint(equalToConstant: 45),
            
            roomInputLabel.topAnchor.constraint(equalTo: buildingTextField.bottomAnchor, constant: 15),
            roomInputLabel.widthAnchor.constraint(equalToConstant: 110),
            roomInputLabel.heightAnchor.constraint(equalToConstant: 45),
            
            roomTextField.topAnchor.constraint(equalTo: buildingTextField.bottomAnchor, constant: 15),
            roomTextField.leftAnchor.constraint(equalTo: buildingInputLabel.rightAnchor, constant: 10),
            roomTextField.widthAnchor.constraint(equalToConstant: 225),
            roomTextField.heightAnchor.constraint(equalToConstant: 45),

            spinner.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            saveCurrentButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -100),
            saveCurrentButton.widthAnchor.constraint(equalToConstant: 175),
            saveCurrentButton.heightAnchor.constraint(equalToConstant: 50),
            saveCurrentButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
        ])
    }
    
    @objc func dismissView() {
        self.dismiss(animated: true, completion: nil)
    }
    
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
    
    /// Picker delegate methods
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
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
            selectedBuilding = buildingData[row]
            buildingTextField.text = selectedBuilding
            setRoomsList(building: selectedBuilding)
            self.roomPicker.reloadAllComponents()
            roomPicker.selectRow(0, inComponent: 0, animated: true)
            roomTextField.textColor = .lightGray
            selectedRoom = locationDict[selectedBuilding]![0]
            roomTextField.text = selectedRoom
        } else {
            selectedRoom = locationDict[selectedBuilding]![row]
            roomTextField.text = selectedRoom
            if row == 0 {
                roomTextField.textColor = .lightGray
            } else {
                roomTextField.textColor = .black
            }
        }
        refreshFileName()
    }
    
    @objc func doneClick(sender: UIBarButtonItem) {
        roomTextField.resignFirstResponder()
        buildingTextField.resignFirstResponder()
    }
    
//    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
//        return true
//    }
//
//    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
//        return true
//    }
   
    /// Save methods
    func onSaveError(error: XError) {
        dismissModal()
        mainController.onSaveError(error: error)
    }
        
    func dismissModal() { self.dismiss(animated: true, completion: nil) }
    
    private func beforeSave() {
        saveCurrentButton.isEnabled = false
        isModalInPresentation = true
    }
        
    @objc func executeSave() -> Void {
        let unixTime = Int(NSDate().timeIntervalSince1970)
        var fileName = fileName.text + "-" + String(unixTime)
        let format = "ascii"
        
        if selectedBuilding == "Select building..." || selectedRoom == "Select room..." {
            fileName = "invalid"
        }
        
        mainController.renderer.saveAsPlyFile(
            fileName: fileName,
            beforeGlobalThread: [beforeSave, spinner.startAnimating],
            afterGlobalThread: [dismissModal, spinner.stopAnimating, mainController.afterSave],
            errorCallback: onSaveError,
            format: format)
    }
    
}
