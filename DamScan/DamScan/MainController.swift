import UIKit
import Metal
import MetalKit
import ARKit

final class MainController: UIViewController, ARSessionDelegate {
    private let isUIEnabled = true
    private var clearButton = UIButton(type: .system)
    private let confidenceControl = UISegmentedControl(items: ["Low", "Medium", "High"])
    private var rgbButton = UIButton(type: .system)
    private var showSceneButton = UIButton(type: .system)
    private var infoButton = UIButton(type: .system)
    private var uploadButton = UIButton(type: .system)
    private var toggleParticlesButton = UIButton(type: .system)
    private let session = ARSession()
    var renderer: Renderer!
    private  var isPasued = false
    
    lazy var particleOnHeightAnchor = toggleParticlesButton.heightAnchor.constraint(equalToConstant: 55)
    lazy var particleOffHeightAnchor = toggleParticlesButton.heightAnchor.constraint(equalToConstant: 60)
    
    lazy var rgbOnHeightAnchor = rgbButton.heightAnchor.constraint(equalToConstant: 43)
    lazy var rgbOffHeightAnchor = rgbButton.heightAnchor.constraint(equalToConstant: 50)
    lazy var rgbOnBottomAnchor = rgbButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -58)
    lazy var rgbOffBottomAnchor = rgbButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -55)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        guard let device = MTLCreateSystemDefaultDevice() else {
            print("Metal is not supported on this device")
            return
        }
        
        session.delegate = self
        // Set the view to use the default device
        if let view = view as? MTKView {
            view.device = device
            view.backgroundColor = UIColor.clear
            // we need this to enable depth test
            view.depthStencilPixelFormat = .depth32Float
            view.contentScaleFactor = 1
            view.delegate = self
            // Configure the renderer to draw to the view
            renderer = Renderer(session: session, metalDevice: device, renderDestination: view)
            renderer.drawRectResized(size: view.bounds.size)
        }
        
        clearButton = createButton(mainView: self, iconName: "trash.circle.fill",
                                   tintColor: .red, hidden: !isUIEnabled)
        view.addSubview(clearButton)
        
        uploadButton = createButton(mainView: self, iconName: "square.and.arrow.up",
            tintColor: .white, hidden: !isUIEnabled)
        view.addSubview(uploadButton)
        
        infoButton = createButton(mainView: self, iconName: "info.circle.fill",
            tintColor: .white, hidden: !isUIEnabled)
        view.addSubview(infoButton)
        
        showSceneButton = createButton(mainView: self, iconName: "record.circle",
            tintColor: .white, hidden: !isUIEnabled)
        view.addSubview(showSceneButton)
        
        toggleParticlesButton = createButton(mainView: self, iconName: "aqi.medium",
            tintColor: .white, hidden: !isUIEnabled)
        view.addSubview(toggleParticlesButton)
        
        rgbButton = createButton(mainView: self, iconName: "video.slash",
            tintColor: .white, hidden: !isUIEnabled)
        view.addSubview(rgbButton)
        
        NSLayoutConstraint.activate([
            clearButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 50),
            clearButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            clearButton.widthAnchor.constraint(equalToConstant: 50),
            clearButton.heightAnchor.constraint(equalToConstant: 50),
            
            uploadButton.widthAnchor.constraint(equalToConstant: 50),
            uploadButton.heightAnchor.constraint(equalToConstant: 50),
            uploadButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -50),
            uploadButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            
            infoButton.widthAnchor.constraint(equalToConstant: 50),
            infoButton.heightAnchor.constraint(equalToConstant: 50),
            infoButton.topAnchor.constraint(equalTo: view.topAnchor, constant: 50),
            infoButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            showSceneButton.widthAnchor.constraint(equalToConstant: 80),
            showSceneButton.heightAnchor.constraint(equalToConstant: 80),
            showSceneButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -50),
            showSceneButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            toggleParticlesButton.widthAnchor.constraint(equalToConstant: 60),
            particleOnHeightAnchor,
            toggleParticlesButton.leftAnchor.constraint(equalTo: view.leftAnchor, constant: 50),
            toggleParticlesButton.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -50),
            
            rgbButton.widthAnchor.constraint(equalToConstant: 60),
            rgbOffHeightAnchor,
            rgbButton.rightAnchor.constraint(equalTo: view.rightAnchor, constant: -50),
            rgbOffBottomAnchor
        ])
    }
    
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        // Create a world-tracking configuration, and
        // enable the scene depth frame-semantic.
        let configuration = ARWorldTrackingConfiguration()
        configuration.frameSemantics = [.sceneDepth, .smoothedSceneDepth]
        // Run the view's session
        session.run(configuration)
        
        // The screen shouldn't dim during AR experiences.
        UIApplication.shared.isIdleTimerDisabled = true
    }
    
    @objc
    func viewValueChanged(view: UIView) {
        switch view {
        case confidenceControl:
            renderer.confidenceThreshold = confidenceControl.selectedSegmentIndex
            
        case rgbButton:
            renderer.rgbOn = !renderer.rgbOn
            if (!renderer.rgbOn) {
                rgbButton.setBackgroundImage(.init(systemName: "video.slash"), for: .normal)
                rgbOnHeightAnchor.isActive = false
                rgbOffHeightAnchor.isActive = true
                rgbOnBottomAnchor.isActive = false
                rgbOffBottomAnchor.isActive = true
            } else {
                rgbButton.setBackgroundImage(.init(systemName: "video"), for: .normal)
                rgbOffHeightAnchor.isActive = false
                rgbOnHeightAnchor.isActive = true
                rgbOffBottomAnchor.isActive = false
                rgbOnBottomAnchor.isActive = true
            }
            
        case clearButton:
            renderer.isInViewSceneMode = true
            setShowSceneButtonStyle(isScanning: false)
            renderer.clearParticles()
            
        case uploadButton:
            renderer.isInViewSceneMode = true
            setShowSceneButtonStyle(isScanning: false)
            goToSaveCurrentScanView()
            
        case infoButton:
            renderer.isInViewSceneMode = true
            setShowSceneButtonStyle(isScanning: false)
            goToInfoView()
        
        case showSceneButton:
            renderer.isInViewSceneMode = !renderer.isInViewSceneMode
            if !renderer.isInViewSceneMode {
                renderer.showParticles = true
                self.toggleParticlesButton.setBackgroundImage(.init(systemName: "aqi.medium"), for: .normal)
                self.setShowSceneButtonStyle(isScanning: true)
            } else {
                self.setShowSceneButtonStyle(isScanning: false)
            }
            
        case toggleParticlesButton:
            renderer.showParticles = !renderer.showParticles
            if (!renderer.showParticles) {
                renderer.isInViewSceneMode = true
                self.setShowSceneButtonStyle(isScanning: false)
                self.toggleParticlesButton.setBackgroundImage(.init(systemName: "hexagon"), for: .normal)
                particleOnHeightAnchor.isActive = false
                particleOffHeightAnchor.isActive = true
            } else {
                self.toggleParticlesButton.setBackgroundImage(.init(systemName: "aqi.medium"), for: .normal)
                particleOffHeightAnchor.isActive = false
                particleOnHeightAnchor.isActive = true
            }
        default:
            break
        }
    }
    
    // Auto-hide the home indicator to maximize immersion in AR experiences.
    override var prefersHomeIndicatorAutoHidden: Bool {
        return true
    }
    
    // Hide the status bar to maximize immersion in AR experiences.
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    func session(_ session: ARSession, didFailWithError error: Error) {
        // Present an error message to the user.
        guard error is ARError else { return }
        let errorWithInfo = error as NSError
        let messages = [
            errorWithInfo.localizedDescription,
            errorWithInfo.localizedFailureReason,
            errorWithInfo.localizedRecoverySuggestion
        ]
        let errorMessage = messages.compactMap({ $0 }).joined(separator: "\n")
        DispatchQueue.main.async {
            // Present an alert informing about the error that has occurred.
            let alertController = UIAlertController(title: "The AR session failed.", message: errorMessage, preferredStyle: .alert)
            let restartAction = UIAlertAction(title: "Restart Session", style: .default) { _ in
                alertController.dismiss(animated: true, completion: nil)
                if let configuration = self.session.configuration {
                    self.session.run(configuration, options: .resetSceneReconstruction)
                }
            }
            alertController.addAction(restartAction)
            self.present(alertController, animated: true, completion: nil)
        }
    }
}


// MARK: - MTKViewDelegate
extension MainController: MTKViewDelegate {
    // Called whenever view changes orientation or layout is changed
    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {
        renderer.drawRectResized(size: size)
    }
    
    // Called whenever the view needs to render
    func draw(in view: MTKView) {
        renderer.draw()
    }
}

// MARK: - Added controller functionality
extension MainController {
    private func setShowSceneButtonStyle(isScanning: Bool) -> Void {
        if isScanning {
            self.showSceneButton.setBackgroundImage(
                .init(systemName: "stop.circle"), for: .normal)
            self.showSceneButton.tintColor = .red
        } else {
            self.showSceneButton.setBackgroundImage(
                .init(systemName: "record.circle"), for: .normal)
            self.showSceneButton.tintColor = .white
        }
    }
    
    func onSaveError(error: XError) {
        displayErrorMessage(error: error)
        renderer.savingError = nil
    }
    
    func export(url: URL) -> Void {
        present(
            UIActivityViewController(
                activityItems: [url as Any],
                applicationActivities: .none),
            animated: true)
    }
    
    func afterSave() -> Void {
        let err = renderer.savingError
        if err == nil {
            displaySuccessMessage(title: "Scan submitted")
            return export(url: renderer.savedCloudURLs.last!)
        }
        try? FileManager.default.removeItem(at: renderer.savedCloudURLs.last!)
        renderer.savedCloudURLs.removeLast()
        onSaveError(error: err!)
    }
    
    func goToInfoView() {
        let infoController = InfoScrollController()
        infoController.mainController = self
        present(infoController, animated: true, completion: nil)
    }
    
    func goToSaveCurrentScanView() {
        let saveController = SaveController()
        saveController.mainController = self
        present(saveController, animated: true, completion: nil)
    }
    
    func goToExportView() -> Void {
        let exportController = ExportController()
        exportController.mainController = self
        present(exportController, animated: true, completion: nil)
    }
    
    func displayErrorMessage(error: XError) -> Void {
        var title: String
        switch error {
            case.alreadySavingFile: title = "Save in progress, please wait."
            case.invalidInput: title = "Building or room not selected, try again"
            case.noScanDone: title = "No Scan to save."
            case.savingFailed: title = "Failed to write file."
        }
        
        let alert = UIAlertController(title: title, message: nil, preferredStyle: .alert)
        alert.view.subviews.first?.subviews.first?.subviews.first?.backgroundColor = .red
        present(alert, animated: true, completion: nil)
        let when = DispatchTime.now() + 2
        DispatchQueue.main.asyncAfter(deadline: when) {
            alert.dismiss(animated: true, completion: nil)
        }
    }
    
    func displaySuccessMessage(title: String) -> Void {
        let alert = UIAlertController(title: title, message: nil, preferredStyle: .alert)
        alert.view.subviews.first?.subviews.first?.subviews.first?.backgroundColor = .green
        present(alert, animated: true, completion: nil)
        let when = DispatchTime.now() + 2
        DispatchQueue.main.asyncAfter(deadline: when) {
            alert.dismiss(animated: true, completion: nil)
        }
    }
}

// MARK: - RenderDestinationProvider
protocol RenderDestinationProvider {
    var currentRenderPassDescriptor: MTLRenderPassDescriptor? { get }
    var currentDrawable: CAMetalDrawable? { get }
    var colorPixelFormat: MTLPixelFormat { get set }
    var depthStencilPixelFormat: MTLPixelFormat { get set }
    var sampleCount: Int { get set }
}

extension SCNNode {
    func cleanup() {
        for child in childNodes {
            child.cleanup()
        }
        self.geometry = nil
    }
}

func createButton(mainView: MainController, iconName: String, tintColor: UIColor, hidden: Bool) -> UIButton {
    let button = UIButton(type: .system)
    button.isHidden = hidden
    button.translatesAutoresizingMaskIntoConstraints = false
    button.setBackgroundImage(.init(systemName: iconName), for: .normal)
    button.tintColor = tintColor
    button.addTarget(mainView, action: #selector(mainView.viewValueChanged), for: .touchUpInside)
    return button
}

extension MTKView: RenderDestinationProvider {
    
}
