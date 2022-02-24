//
//  InstructionView.swift
//  SceneDepthPointCloud
//
//  Created by Gavin Gutowsky on 1/16/22.
//  Copyright © 2022 Apple. All rights reserved.
//

import SwiftUI
import Foundation

class InfoInstructionView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupImageView()
        setupTextView()
        setupInstructions()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    let imageView: UIImageView = {
        let image = UIImage(systemName: "hand.tap")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let textView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "How to scan:", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 24)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let recordImage: UIImageView = {
        let image = UIImage(systemName: "record.circle")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let recordText: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Tap to start recording points, tap again to stop", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
        textView.attributedText = attributeText
        textView.textAlignment = .left
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let deleteImage: UIImageView = {
        let image = UIImage(systemName: "trash.circle.fill")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let deleteText: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Tap to delete captured points", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
        textView.attributedText = attributeText
        textView.textAlignment = .left
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let pointImage: UIImageView = {
        let image = UIImage(systemName: "aqi.medium")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let pointText: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Tap to hide captured points, tap again to show", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
        textView.attributedText = attributeText
        textView.textAlignment = .left
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let cameraImage: UIImageView = {
        let image = UIImage(systemName: "video.slash.fill")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let cameraText: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Tap to show live camera feed, tap again to hide", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
        textView.attributedText = attributeText
        textView.textAlignment = .left
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    func setupImageView() {
        self.addSubview(imageView)
        NSLayoutConstraint.activate([
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: self.topAnchor, constant: 30),
            imageView.widthAnchor.constraint(equalToConstant: 150),
            imageView.heightAnchor.constraint(equalToConstant: 175)
        ])
    }
    
    func setupTextView() {
        self.addSubview(textView)
        NSLayoutConstraint.activate([
            textView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 24),
            textView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -24),
            textView.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 25)
        ])
    }
    
    func setupInstructions() {
        self.addSubview(recordImage)
        self.addSubview(recordText)
        
        self.addSubview(deleteImage)
        self.addSubview(deleteText)
        
        self.addSubview(pointImage)
        self.addSubview(pointText)
        
        self.addSubview(cameraImage)
        self.addSubview(cameraText)
        
        NSLayoutConstraint.activate([
            recordImage.widthAnchor.constraint(equalToConstant: 50),
            recordImage.heightAnchor.constraint(equalToConstant: 50),
            recordImage.topAnchor.constraint(equalTo: textView.bottomAnchor, constant: 5),
            recordImage.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 40),
            recordText.leftAnchor.constraint(equalTo: recordImage.rightAnchor, constant: 10),
            recordText.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            recordText.centerYAnchor.constraint(equalTo: recordImage.topAnchor, constant: 25),
            
            deleteImage.widthAnchor.constraint(equalToConstant: 50),
            deleteImage.heightAnchor.constraint(equalToConstant: 50),
            deleteImage.topAnchor.constraint(equalTo: recordImage.bottomAnchor, constant: 25),
            deleteImage.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 40),
            deleteText.leftAnchor.constraint(equalTo: deleteImage.rightAnchor, constant: 10),
            deleteText.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            deleteText.centerYAnchor.constraint(equalTo: deleteImage.topAnchor, constant: 25),
            
            pointImage.widthAnchor.constraint(equalToConstant: 50),
            pointImage.heightAnchor.constraint(equalToConstant: 45),
            pointImage.topAnchor.constraint(equalTo: deleteImage.bottomAnchor, constant: 25),
            pointImage.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 40),
            pointText.leftAnchor.constraint(equalTo: pointImage.rightAnchor, constant: 10),
            pointText.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            pointText.centerYAnchor.constraint(equalTo: pointImage.topAnchor, constant: 22.5),
            
            cameraImage.widthAnchor.constraint(equalToConstant: 50),
            cameraImage.heightAnchor.constraint(equalToConstant: 40),
            cameraImage.topAnchor.constraint(equalTo: pointImage.bottomAnchor, constant: 25),
            cameraImage.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 40),
            cameraText.leftAnchor.constraint(equalTo: cameraImage.rightAnchor, constant: 10),
            cameraText.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            cameraText.centerYAnchor.constraint(equalTo: cameraImage.topAnchor, constant: 20)
        ])
    }
}
