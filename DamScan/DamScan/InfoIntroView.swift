//
//  InfoView.swift
//  SceneDepthPointCloud
//
//  Created by Gavin Gutowsky on 1/13/22.
//  Copyright © 2022 Apple. All rights reserved.
//

import SwiftUI
import Foundation

class InfoIntroView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    let imageView: UIImageView = {
        let image = UIImage(named: "OSULogoColor")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let textView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Welcome to DamScan", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 24)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let bodyTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "DamScan is an app that allows users to take LiDAR scans of the Oregon State University campus by building and room. These scans are uploaded to contribute to an online library of publicly available 3D mappings.\n\nGo to the next screen to learn how to capture and upload a scan. \n\nThank you for contributing!", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 15)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    func setupViews() {
        self.addSubview(imageView)
        self.addSubview(textView)
        self.addSubview(bodyTextView)
        NSLayoutConstraint.activate([
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: self.topAnchor, constant: 75),
            imageView.widthAnchor.constraint(equalToConstant: 175),
            imageView.heightAnchor.constraint(equalToConstant: 175),
            textView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 25),
            textView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            textView.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 20),
            bodyTextView.topAnchor.constraint(equalTo: textView.bottomAnchor),
            bodyTextView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 27),
            bodyTextView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -27)
        ])
    }
}
