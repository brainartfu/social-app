package com.wpg.socialnetwork.app.android;

import android.content.res.Configuration;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;


import androidx.annotation.NonNull;

import com.wpg.socialnetwork.app.android.generated.BasePackageList;

import android.app.Application;
import android.util.Log;

import android.content.Intent;
import android.content.res.Configuration;


// import com.twiliorn.library.TwilioPackage;

import com.facebook.react.PackageList;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.wpg.socialnetwork.app.android.launchapplication.LaunchApplicationPackage;;
import com.wpg.socialnetwork.app.android.videoplayer.VideoPlayerPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.facebook.soloader.SoLoader;


import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(
+    this,
+    new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();

      // Add unimodules
      List<ReactPackage> unimodules = Arrays.<ReactPackage>asList(
        new ModuleRegistryAdapter(mModuleRegistryProvider)
      );
      packages.addAll(unimodules);

      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
        packages.add(new VideoPlayerPackage());
        // packages.add(new TwilioPackage());
        packages.add(new LaunchApplicationPackage());

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  });

  // @Override
  // public void onConfigurationChanged(Configuration newConfig) {
  //   super.onConfigurationChanged(newConfig);
  //   Intent intent = new Intent("onConfigurationChanged");
  //   intent.putExtra("newConfig", newConfig);
  //   sendBroadcast(intent);
  // }

  @Override
  public ReactNativeHost getReactNativeHost() {
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
    return mReactNativeHost;
    
  }
   @Override
+  public void onConfigurationChanged(@NonNull Configuration newConfig) {
+    super.onConfigurationChanged(newConfig);
+    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
+  }

 
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
