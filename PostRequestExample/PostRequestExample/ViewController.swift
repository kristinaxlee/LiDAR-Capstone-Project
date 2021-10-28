//
//  ViewController.swift
//  PostRequestExample
//
//  Created by Kristina Lee on 10/27/21.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func sendRequestButton(_ sender: Any) {
        guard let url = URL(string: "https://jsonplaceholder.typicode.com/posts") else {
                return
            }
            
        print("Making api call...")
            
        var request = URLRequest(url: url)
        
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let unixTimestamp = NSDate().timeIntervalSince1970
        
        // format request body as a dictionary
        let body: [String: AnyHashable] = [
            "userId": 1,
            "title": "Sending the current date.",
            "body": "The current Unix timestamp is: \(unixTimestamp)",
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: .fragmentsAllowed)
        
        // make POST request
        let task = URLSession.shared.dataTask(with: request) { data, _, error in
            // assign data to data variable if request is successful
            guard let data = data, error == nil else {
                return
            }
            
            do {
                let response = try JSONSerialization.jsonObject(with: data, options: .allowFragments)
                print("SUCCESS: \(response) ")
            }
            catch {
                print("Error: \(error)")
                print(error)
            }
        }
        
        task.resume()
    }
    
}

