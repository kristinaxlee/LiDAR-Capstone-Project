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
        let image = UIImage(named: "Icon")
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
    
    let headerTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Developed By:", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 20)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let authorTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Kristina Lee\nCristian Garibay\nGavin Gutowsky", attributes: [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 16)])
        textView.attributedText = attributeText
        textView.textAlignment = .center
        textView.isEditable = false
        textView.isScrollEnabled = false
        textView.translatesAutoresizingMaskIntoConstraints = false
        return textView
    }()
    
    let nextTextView: UITextView = {
        let textView = UITextView()
        let attributeText = NSMutableAttributedString(string: "Tap NEXT or swipe left to continue", attributes: [NSAttributedString.Key.font: UIFont.boldSystemFont(ofSize: 16)])
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
        self.addSubview(headerTextView)
        self.addSubview(authorTextView)
        self.addSubview(nextTextView)
//        self.addSubview(arrowImage)
        NSLayoutConstraint.activate([
            textView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            textView.topAnchor.constraint(equalTo: self.topAnchor, constant: 100),
            imageView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            imageView.topAnchor.constraint(equalTo: textView.bottomAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 100),
            imageView.heightAnchor.constraint(equalToConstant: 100),
            headerTextView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            headerTextView.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 50),
            authorTextView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
            authorTextView.topAnchor.constraint(equalTo: headerTextView.bottomAnchor),
            nextTextView.topAnchor.constraint(equalTo: authorTextView.bottomAnchor, constant: 120),
            nextTextView.centerXAnchor.constraint(equalTo: self.centerXAnchor),
//            arrowImage.topAnchor.constraint(equalTo: authorTextView.bottomAnchor, constant: 120),
//            arrowImage.centerXAnchor.constraint(equalTo: self.centerXAnchor),
//            arrowImage.widthAnchor.constraint(equalToConstant: 45),
//            arrowImage.heightAnchor.constraint(equalToConstant: 40)
        ])
    }
}
