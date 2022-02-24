//
//  CustomColors.swift
//  SceneDepthPointCloud
//
//  Created by Gavin Gutowsky on 1/16/22.
//  Copyright © 2022 Apple. All rights reserved.
//

import Foundation
import SwiftUI

extension UIColor {
    convenience init(rgb: UInt) {
        self.init(
            red: CGFloat((rgb & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgb & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgb & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
    
    static var damBlue: UIColor {
        return UIColor(rgb: 0x0883EB)
    }
}
