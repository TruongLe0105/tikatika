//
//  Dynamic.swift
//  TikaUserET
//
//  Created by MAC PRO on 6/16/22.
//

import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
    let animationView = AnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.frame.size.width = 250
    animationView.frame.size.height = 10
    animationView.center = rootView.center
    animationView.frame.origin.y = rootView.frame.height / 2 + 100
    animationView.backgroundColor = #colorLiteral(red: 1, green: 1, blue: 1, alpha: 0);
    return animationView;
  }

  @objc func play(animationView: AnimationView) {
    animationView.loopMode = .loop
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
