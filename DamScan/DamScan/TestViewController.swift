//
//  SaveController.swift
//  SceneDepthPointCloud
    


import SwiftUI
import Foundation
    
class ViewController : UIViewController, UIPickerViewDelegate, UIPickerViewDataSource, UITextFieldDelegate {
    var mainController: MainController!
    private var buildingData: [String] = ["Kelley Engineering Center", "Johnson Hall", "Other Place", "Other Place2"]
    private var locationDict = [
        "Kelley Engineering Center": ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"],
        "Johnson Hall": ["Room 4", "Room 5", "Room 6", "Room 4", "Room 5", "Room 6"],
        "Other Place": ["Room 1", "Room 5", "Room 6", "Room 4", "Room 5", "Room 6"],
        "Other Place2": ["Room 4", "Room 5", "Room 6", "Room 4", "Room 5", "Room 6"]
    ]
    private var roomList = [String]()
    private var selectedBuilding: String?
    private var selectedRoom: String?
    private let formatPicker = UIPickerView()
    private let buildingPicker = UIPickerView()
    private let roomPicker = UIPickerView()
    private let spinner = UIActivityIndicatorView(style: .large)
    private let saveCurrentButton = UIButton(type: .system)
    private let saveCurrentScanLabel = UILabel()
    private var exportData = [URL]()

    private let buildingTextField: UITextField = {
        let textField = UITextField()
        textField.text = ""
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.textAlignment = .center
        textField.isUserInteractionEnabled = true
        return textField
    } ()

    private let roomTextField: UITextField = {
        let textField = UITextField()
        textField.text = ""
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.textAlignment = .center
        textField.isUserInteractionEnabled = true
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

        // Adding Button ToolBar
        let doneButton = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(doneClick(sender:)))
        let spaceButton = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        let cancelButton = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(doneClick(sender:)))
        
        view.addSubview(toolBar)
        toolBar.setItems([cancelButton, spaceButton, doneButton], animated: false)

        buildingTextField.delegate = self
        buildingTextField.inputView = buildingPicker
        buildingTextField.inputAccessoryView = toolBar
        view.addSubview(buildingTextField)
        roomTextField.delegate = self
        roomTextField.inputView = roomPicker
        roomTextField.inputAccessoryView = toolBar
        view.addSubview(roomTextField)

        buildingPicker.delegate = self
        buildingPicker.dataSource = self
        buildingPicker.translatesAutoresizingMaskIntoConstraints =  false
        buildingPicker.delegate?.pickerView?(buildingPicker, didSelectRow: 0, inComponent: 0)
//        view.addSubview(buildingPicker)

        roomPicker.delegate = self
        roomPicker.dataSource = self
        roomPicker.translatesAutoresizingMaskIntoConstraints =  false
        roomPicker.delegate?.pickerView?(roomPicker, didSelectRow: 0, inComponent: 0)
//        view.addSubview(roomPicker)

        NSLayoutConstraint.activate([
            buildingTextField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            buildingTextField.widthAnchor.constraint(equalToConstant: 250),
            buildingTextField.heightAnchor.constraint(equalToConstant: 45),
            buildingTextField.topAnchor.constraint(equalTo: view.topAnchor, constant: 200),

            roomTextField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            roomTextField.widthAnchor.constraint(equalToConstant: 250),
            roomTextField.heightAnchor.constraint(equalToConstant: 45),
            roomTextField.topAnchor.constraint(equalTo: buildingTextField.bottomAnchor, constant: 500),

//            buildingPicker.heightAnchor.constraint(equalToConstant: 150),
//            buildingPicker.topAnchor.constraint(equalTo: view.centerYAnchor, constant: 10),
//            buildingPicker.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//
//            roomPicker.heightAnchor.constraint(equalToConstant: 150),
//            roomPicker.topAnchor.constraint(equalTo: buildingPicker.bottomAnchor, constant: 10),
//            roomPicker.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
    }

    func setRoomsList(building: String) {
        self.roomList = locationDict[building]!
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
            selectedBuilding = buildingData[row]
            buildingTextField.text = selectedBuilding
            setRoomsList(building: selectedBuilding!)
            self.roomPicker.reloadAllComponents()
            roomPicker.selectRow(0, inComponent: 0, animated: true)
            selectedRoom = locationDict[selectedBuilding!]![0]
            roomTextField.text = selectedRoom
        } else {
            selectedRoom = locationDict[selectedBuilding!]![row]
            roomTextField.text = selectedRoom
        }
    }
    
    @objc private func doneClick(sender: UIBarButtonItem) {
        buildingTextField.resignFirstResponder()
        roomTextField.resignFirstResponder()
    }

    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        return true
    }
}
