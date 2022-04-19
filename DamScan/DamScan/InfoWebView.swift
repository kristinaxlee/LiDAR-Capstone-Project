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
        setupViews()
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
    
    let titleTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "View scans online:", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 24)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let urlTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "www.DamScan.com", attributes: [
            NSAttributedString.Key.link: URL(string: "http://www.DamScan.com")!,
            NSAttributedString.Key.underlineStyle: 1,
            NSAttributedString.Key.font: UIFont.systemFont(ofSize: 30)]
        )
        textView.attributedText = attributeText
        textView.textColor = .damBlue
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    func setupViews() {
        self.addSubview(imageView)
        self.addSubview(titleTextView)
        self.addSubview(urlTextView)
        NSLayoutConstraint.activate([
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: self.topAnchor, constant: 135),
            imageView.widthAnchor.constraint(equalToConstant: 175),
            imageView.heightAnchor.constraint(equalToConstant: 150),
            
            titleTextView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 25),
            titleTextView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            titleTextView.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 35),
            
            urlTextView.leftAnchor.constraint(equalTo: self.leftAnchor, constant: 25),
            urlTextView.rightAnchor.constraint(equalTo: self.rightAnchor, constant: -25),
            urlTextView.topAnchor.constraint(equalTo: titleTextView.bottomAnchor, constant: -5)
        ])
    }
}
