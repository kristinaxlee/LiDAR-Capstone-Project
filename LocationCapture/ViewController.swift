//
//  ViewController.swift
//  LocationCapture
//
//  Created by Gutowsky, Gavin Taylor on 11/1/21.
//

import UIKit
import CoreLocation

class ViewController: UIViewController, LocationServiceDelegate {
    
    private let latLngLabel: UILabel = {
        let label = UILabel()
        label.backgroundColor = .systemFill
        label.numberOfLines = 0
        label.textAlignment = .center
        label.font = .systemFont(ofSize: 26)
        label.text = "This is where the lat/lon should be"
        return label
    }()
    
    private let headingLabel: UILabel = {
        let label = UILabel()
        label.backgroundColor = .systemFill
        label.numberOfLines = 0
        label.textAlignment = .center
        label.font = .systemFont(ofSize: 26)
        label.text = "This is where the heading should be"
        return label
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        latLngLabel.frame = CGRect(x: 20, y: view.bounds.height / 2 - 125, width: view.bounds.width - 40, height: 100)
        view.addSubview(latLngLabel)
        
        headingLabel.frame = CGRect(x: 20, y: view.bounds.height / 2 - 25, width: view.bounds.width - 40, height: 100)
        view.addSubview(headingLabel)
        
        LocationService.sharedInstance.delegate = self
    }

    // https://github.com/mizutori/iOSLocationStarterKit/blob/master/LocationStarterKit/ViewController.swift
//    @objc func showTurnOnLocationServiceAlert(notification: NSNotification){
//        let alert = UIAlertController(title: "Turn on Location Service", message: "To use location tracking feature of the app, please turn on the location service from the Settings app.", preferredStyle: .alert)
//
//        let settingsAction = UIAlertAction(title: "Settings", style: .default) { (_) -> Void in
//            let settingsUrl = URL(string: UIApplication.openSettingsURLString)
//            if let url = settingsUrl {
//                UIApplication.shared.open(url, options: [:], completionHandler: nil)
//            }
//        }
//
//        let cancelAction = UIAlertAction(title: NSLocalizedString("Cancel", comment: ""), style: .cancel, handler: nil)
//        alert.addAction(settingsAction)
//        alert.addAction(cancelAction)
//
//        present(alert, animated: true, completion: nil)
//    }
    
    func tracingLocation(currentLocation: CLLocation) {
        latLngLabel.text = "Lat : \(currentLocation.coordinate.latitude) \nLng : \(currentLocation.coordinate.longitude)"
    }
    
    func tracingHeading(currentHeading: CLHeading) {
        latLngLabel.text = "Magnetic Heading: \(currentHeading.magneticHeading) \nTrue Heading : \(currentHeading.trueHeading)"
    }
    
    func tracingLocationDidFailWithError(error: NSError) {
//        if (error as NSError).domain == kCLErrorDomain && (error as NSError).code == CLError.Code.denied.rawValue {
//            //User denied your app access to location information.
//            showTurnOnLocationServiceAlert()
//        }
        print("tracing Location Error : \(error.description)")
    }
    
    func showTurnOnLocationServiceAlert(){
        NotificationCenter.default.post(name: Notification.Name(rawValue:"showTurnOnLocationServiceAlert"), object: nil)
    }
}
