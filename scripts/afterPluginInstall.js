#!/usr/bin/env node

module.exports = function(context) {
  let fs = context.requireCordovaModule('fs'),
    path = context.requireCordovaModule('path');

  // android platform directory
  let platformAndroidDir = path.join(context.opts.projectRoot, 'platforms/android');

  // android app module directory
  let platformAndroidAppModuleDir = path.join(platformAndroidDir, 'app');

  // android manifest file
  let androidManifestFile = path.join(platformAndroidAppModuleDir, 'src/main/AndroidManifest.xml');

  if (fs.existsSync(androidManifestFile)) {

    fs.readFile(androidManifestFile, 'UTF-8', function(err, data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      // the Android Application class that need to config to Android manifest file
      let usesCleartextTraffic = 'android:usesCleartextTraffic';

      if (data.indexOf(usesCleartextTraffic) === -1) {// 未找到

        let result = data.replace(/<application/g, '<application android:usesCleartextTraffic="true" ');

        fs.writeFile(androidManifestFile, result, 'UTF-8', function(err) {
          if (err)
            throw new Error('Unable to write into AndroidManifest.xml: ' + err);
        })
      }
    });
  }
};