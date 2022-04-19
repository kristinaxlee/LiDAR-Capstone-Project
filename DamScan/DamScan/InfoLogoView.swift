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
        setupViews()
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
    
    let arrowImage: UIImageView = {
        let image = UIImage(systemName: "arrow.right")
        let imageView = UIImageView(image: image!)
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    func setupViews() {
        self.addSubview(textView)
        self.addSubview(imageView)
        self.addSubview(arrowImage)
        NSLayoutConstraint.activate([
            textView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            textView.topAnchor.constraint(equalTo: self.topAnchor, constant: 150),
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: textView.bottomAnchor, constant: 5),
            imageView.widthAnchor.constraint(equalToConstant: 75),
            imageView.heightAnchor.constraint(equalToConstant: 75),
            arrowImage.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 125),
            arrowImage.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            arrowImage.widthAnchor.constraint(equalToConstant: 45),
            arrowImage.heightAnchor.constraint(equalToConstant: 40)
        ])
    }
}
