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

  // android app module gradle
  let androidAppModuleGradleFile = path.join(platformAndroidAppModuleDir, 'build.gradle');

  if (fs.existsSync(androidManifestFile)) {

    fs.readFile(androidManifestFile, 'UTF-8', function(err, data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      //Android Application of Android manifest that need to delete config
      let usesCleartextTraffic = 'android:usesCleartextTraffic="true"';

      if (data.indexOf(usesCleartextTraffic) !== -1) {// 找到

        let result = data.replace(usesCleartextTraffic, '');

        fs.writeFile(androidManifestFile, result, 'UTF-8', function(err) {
          if (err)
            throw new Error('Unable to write into AndroidManifest.xml: ' + err);
        })
      }
    });
  }
  // if (fs.existsSync(androidAppModuleGradleFile)) {

  //   fs.readFile(androidAppModuleGradleFile, 'UTF-8', function(err, data) {
  //     if (err) {
  //       throw new Error('Unable to find build.gradle: ' + err);
  //     }

  //     let androidAppModuleGradleConfigLine = 'apply from: "../com-jackro-example/app-jackroexample.gradle"';

  //     if (data.indexOf(androidAppModuleGradleConfigLine) !== -1) {

  //       let result = data.replace(androidAppModuleGradleConfigLine, '');

  //       fs.writeFile(androidAppModuleGradleFile, result, 'UTF-8', function(err) {
  //         if (err)
  //           throw new Error('Unable to write into build.gradle: ' + err);
  //       })
  //     }
  //   });
  // }
};