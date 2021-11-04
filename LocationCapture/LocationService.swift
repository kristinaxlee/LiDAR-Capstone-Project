//
//  LocationService.swift
//  LocationCapture
//
//  Created by Gutowsky, Gavin Taylor on 11/3/21.
//
// https://github.com/igroomgrim/CLLocationManager-Singleton-in-Swift/blob/master/Tracing/Tracing/ViewController.swift

import Foundation
import CoreLocation

protocol LocationServiceDelegate {
    func tracingLocation(currentLocation: CLLocation)
    func tracingHeading(currentHeading: CLHeading)
    func tracingLocationDidFailWithError(error: NSError)
}

class LocationService: NSObject, CLLocationManagerDelegate {
    
    public static var sharedInstance = LocationService()
    
    let locationManager: CLLocationManager
    var currentLocation: CLLocation?
    var currentHeading: CLHeading?
    var delegate : LocationServiceDelegate?
    
    override init() {
        locationManager = CLLocationManager()
        super.init()
        
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.distanceFilter = kCLDistanceFilterNone
        
        locationManager.requestWhenInUseAuthorization()
        locationManager.delegate = self
    }
    
    func startUpdatingLocation(){
         if CLLocationManager.locationServicesEnabled() {
            locationManager.startUpdatingLocation()
            locationManager.startUpdatingHeading()
         }else{
             //tell view controllers to show an alert
             showTurnOnLocationServiceAlert()
         }
     }
    
    func stopUpdatingLocation() {
        print("Stop Location Updates")
        locationManager.stopUpdatingLocation()
    }
    
    func showTurnOnLocationServiceAlert() {
        NotificationCenter.default.post(name: Notification.Name(rawValue:"showTurnOnLocationServiceAlert"), object: nil)
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else {
            return
        }
        
        // singleton for get last(current) location
        self.currentLocation = location
        
        // use for real time update location
        updateLocation(currentLocation: location)
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        // singleton for get last(current) location
        self.currentHeading = newHeading
        
        // use for real time update location
        updateHeading(currentHeading: newHeading)
    }
    
    private func locationManager(_ manager: CLLocationManager, didFailWithError error: NSError) {
        // do on error
        updateLocationDidFailWithError(error: error)
    }
    
    private func updateLocation(currentLocation: CLLocation){
        guard let delegate = self.delegate else {
            return
        }
        
        delegate.tracingLocation(currentLocation: currentLocation)
    }
    
    private func updateHeading(currentHeading: CLHeading){
        guard let delegate = self.delegate else {
            return
        }
        
        delegate.tracingHeading(currentHeading: currentHeading)
    }
    
    private func updateLocationDidFailWithError(error: NSError) {
        guard let delegate = self.delegate else {
            return
        }
        
        delegate.tracingLocationDidFailWithError(error: error)
    }
}
