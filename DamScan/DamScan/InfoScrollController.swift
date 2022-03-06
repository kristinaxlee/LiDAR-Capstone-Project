//
//  InfoSwipeController.swift
//  SceneDepthPointCloud
//
//  Created by Gavin Gutowsky on 1/12/22.
//  Copyright © 2022 Apple. All rights reserved.
//

// https://www.youtube.com/watch?v=EKAVB_56RIU&t=15s

import SwiftUI
import Foundation

class InfoScrollController : UIViewController {
    var mainController: MainController!
    
    private lazy var views = [InfoLogoView(), InfoIntroView(), InfoInstructionView(), InfoWebView()]
    
    private let dismissViewButton: UIButton = {
        let button = UIButton(type: .system)
        button.setBackgroundImage(.init(systemName: "x.circle.fill"), for: .normal)
        button.tintColor = .red
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    } ()
    
    private lazy var scrollView: UIScrollView = {
        let scrollView = UIScrollView()
        scrollView.contentSize = CGSize(width: view.frame.width * CGFloat(views.count), height: view.frame.height)
        scrollView.contentSize.height = 1.0
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.isPagingEnabled = true
        return scrollView
    }()
    
    private let prevButton: UIButton = {
        let button = UIButton(type: .system)
        button.addTarget(self, action: #selector(handlePrev(_:)), for: .touchUpInside)
        button.setTitle("PREV", for: .normal)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        button.setTitleColor(.lightGray, for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    @objc private func handlePrev(_ sender: UIButton) {
        let prevIndex = max(pageControl.currentPage - 1, 0)
        pageControl.currentPage = prevIndex
        scrollView.setContentOffset(CGPoint(x: view.frame.width * CGFloat(prevIndex), y: 0), animated: true)
        if prevIndex == 0 {
            prevButton.setTitleColor(.lightGray, for: .normal)
            prevButton.isEnabled = false
        }
        if nextButton.tintColor != .damBlue{
            nextButton.setTitleColor(.damBlue, for: .normal)
            nextButton.isEnabled = true
        }
    }
    
    private let nextButton: UIButton = {
        let button = UIButton(type: .system)
        button.addTarget(self, action: #selector(handleNext(_:)), for: .touchUpInside)
        button.setTitle("NEXT", for: .normal)
        button.titleLabel?.font = UIFont.boldSystemFont(ofSize: 14)
        button.setTitleColor(.damBlue, for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    @objc private func handleNext(_ sender: UIButton) {
        let nextIndex = min(pageControl.currentPage + 1, views.count - 1)
        pageControl.currentPage = nextIndex
        scrollView.setContentOffset(CGPoint(x: view.frame.width * CGFloat(nextIndex), y: 0), animated: true)
        if nextIndex == views.count - 1 {
            nextButton.setTitleColor(.lightGray, for: .normal)
            nextButton.isEnabled = false
        }
        if prevButton.tintColor != .damBlue{
            prevButton.setTitleColor(.damBlue, for: .normal)
            prevButton.isEnabled = true
        }
    }

    private lazy var pageControl: UIPageControl = {
        let pageControl = UIPageControl()
        pageControl.currentPage = 0
        pageControl.numberOfPages = views.count
        pageControl.currentPageIndicatorTintColor = .damBlue
        pageControl.pageIndicatorTintColor = .lightGray
        pageControl.frame = CGRect(x: 0, y: 0, width: 4, height: 100)
        return pageControl
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        dismissViewButton.addTarget(self, action: #selector(dismissView), for: .touchUpInside)
        view.addSubview(dismissViewButton)
        
        NSLayoutConstraint.activate([
            dismissViewButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 25),
            dismissViewButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 25),
            dismissViewButton.widthAnchor.constraint(equalToConstant: 50),
            dismissViewButton.heightAnchor.constraint(equalToConstant: 50),
        ])
    
        setupBottomControls()
        setupScrollView()
    }
    
    @objc func dismissView() {
        self.dismiss(animated: true, completion: nil)
    }
    
    private func setupScrollView() {
        view.addSubview(scrollView)
        scrollView.delegate = self
        
        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: dismissViewButton.bottomAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -115),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
        ])
        
        for i in 0..<views.count {
            scrollView.addSubview(views[i])
            views[i].frame = CGRect(x: view.frame.width * CGFloat(i), y: 0, width: view.frame.width, height: view.frame.height)
        }
    }
    
    fileprivate func setupBottomControls() {
        view.addSubview(prevButton)
        view.addSubview(nextButton)

        let bottomControlStackView = UIStackView(arrangedSubviews: [prevButton, pageControl, nextButton])
        bottomControlStackView.translatesAutoresizingMaskIntoConstraints = false
        bottomControlStackView.distribution = .fillProportionally
        view.addSubview(bottomControlStackView)

        NSLayoutConstraint.activate([
            prevButton.widthAnchor.constraint(equalToConstant: view.frame.width * 0.15),
            pageControl.widthAnchor.constraint(equalToConstant: view.frame.width * 0.5),
            nextButton.widthAnchor.constraint(equalToConstant: view.frame.width * 0.15),
            bottomControlStackView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -35),
            bottomControlStackView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            bottomControlStackView.heightAnchor.constraint(equalToConstant: 75),
        ])
    }
}

extension InfoScrollController: UIScrollViewDelegate {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        pageControl.currentPage = Int(floor(scrollView.contentOffset.x / view.frame.width))
        if pageControl.currentPage == 0 {
            prevButton.setTitleColor(.lightGray, for: .normal)
            nextButton.isEnabled = false
        } else if pageControl.currentPage != 0 {
            prevButton.setTitleColor(.damBlue, for: .normal)
            prevButton.isEnabled = true
        }
        if pageControl.currentPage == views.count - 1 {
            nextButton.setTitleColor(.lightGray, for: .normal)
            nextButton.isEnabled = false
        } else if pageControl.currentPage != views.count - 1 {
            nextButton.setTitleColor(.damBlue, for: .normal)
            nextButton.isEnabled = true
        }
    }
}
