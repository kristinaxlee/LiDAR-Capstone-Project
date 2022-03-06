//
//  InfoLogoView.swift
//  SceneDepthPointCloud
//
//  Created by Gavin Gutowsky on 1/17/22.
//  Copyright © 2022 Apple. All rights reserved.
//

import SwiftUI
import Foundation

class InfoLogoView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupTextView()
        setupImageView()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    let imageView: UIImageView = {
        let image = UIImage(systemName: "power.dotted")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    let textView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "DAMSCAN", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 48)])
        textView.attributedText = attributeText
        textView.textColor = .damBlue
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    func setupTextView() {
        self.addSubview(textView)
        NSLayoutConstraint.activate([
            textView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            textView.topAnchor.constraint(equalTo: self.topAnchor, constant: 175)
        ])
    }
    
    func setupImageView() {
        self.addSubview(imageView)
        NSLayoutConstraint.activate([
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: textView.bottomAnchor, constant: 5),
            imageView.widthAnchor.constraint(equalToConstant: 75),
            imageView.heightAnchor.constraint(equalToConstant: 75)
        ])
    }
}
