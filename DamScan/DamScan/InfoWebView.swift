//
//  WebConnectionView.swift
//  SceneDepthPointCloud
//
//  Created by Gavin Gutowsky on 1/16/22.
//  Copyright © 2022 Apple. All rights reserved.
//

import SwiftUI
import Foundation

class InfoWebView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupImageView()
        setupTextView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    let imageView: UIImageView = {
        let image = UIImage(systemName: "desktopcomputer.and.arrow.down")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let textView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "View scans online", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 24)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let bodyTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "DamScan is an app that allows users to take LiDAR scans of their environments to contribute to an online library of 3D mapping", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    func setupImageView() {
        self.addSubview(imageView)
        NSLayoutConstraint.activate([
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: self.topAnchor, constant: 45),
            imageView.widthAnchor.constraint(equalToConstant: 175),
            imageView.heightAnchor.constraint(equalToConstant: 150)
        ])
    }
    
    func setupTextView() {
        self.addSubview(textView)
        self.addSubview(bodyTextView)
        NSLayoutConstraint.activate([
            textView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 25),
            textView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            textView.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 35),
            bodyTextView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 25),
            bodyTextView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            bodyTextView.topAnchor.constraint(equalTo: textView.bottomAnchor, constant: 5)
        ])
    }
}
