//=======================================================
//              _
//  _ __       | |_ _ __ ___  _ __  _   _   (_)___
// | '_ \ _____| __| '__/ _ \| '_ \| | | |  | / __|
// | | | |_____| |_| | | (_) | |_) | |_| |_ | \__ \
// |_| |_|      \__|_|  \___/| .__/ \__, (_)/ |___/
//                           |_|    |___/ |__/
// n-tropy.js
// Version: 2.0
// Author: Dino Paskvan
// Mail: dpaskvan@gmail.com
// Web: http://www.dinopaskvan.com
// Copyright (c) 2014 Dino Paskvan
// Licence : MIT
//=======================================================

window.ntropy = (function () {
  "use strict";
  /**
   * Calls ntropy to start the random generation process
   * @param {Object} options - Set the pool and length for the random generator
   * @param {Function} callback - Function to be exectuted after the number has been generated
   */
  return function (options, callback) {
    var pool = options.pool || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890!@#$%",
      limit = options.limit || 10,
      seed = [],
      oldMX = 0,
      oldMY = 0,
      oldX = 0,
      oldY = 0,
      oldZ = 0;

    /**
     * Compars if values have changed enough in relation to the supplied offset
     * @param {Number} oldVal - Previous value
     * @param {Number} newVal - New value
     * @param {Number} offset - The offset to compare to
     */

    function cmpValues(oldVal, newVal, offset) {
      return (oldVal > newVal) ? ((oldVal - newVal) > offset) : ((newVal - oldVal) > offset);
    }

    /**
     * Checks for (compatible) mobile devices
     */

    function mobileCheck() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Uses the data from motion events to create seed for the random string
     * @param {Object} e - The event
     */

    function handleMotionEvent(e) {
      var x = e.accelerationIncludingGravity.x,
        y = e.accelerationIncludingGravity.y,
        z = e.accelerationIncludingGravity.z,
        random = '',
        tSeed,
        i;
      if (cmpValues(oldX, x, 2) || cmpValues(oldY, y, 2) || cmpValues(oldZ, z, 2)) {
        tSeed = Math.abs((Math.floor(x * 100) ^ Math.floor(y * 100)) ^ Math.floor(z * 100)) % (pool.length * 3);
        if (tSeed < pool.length) {
          seed.push(tSeed);
        }
        if (seed.length === limit) {
          for (i = 0; i < seed.length; i = i + 1) {
            random += pool[seed[i]];
            if (random.length === limit) {
              window.removeEventListener('devicemotion', handleMotionEvent, true);
              callback(random);
            }
          }
        }
        oldX = x;
        oldY = y;
        oldZ = z;
      }
    }

    /**
     * Uses the data from mouse movement events to create seed for the random string
     * @param {Object} e - The event
     */

    function handleMouseEvent(e) {
      var x = e.clientX,
        y = e.clientY,
        random = '',
        tSeed,
        i;
      if (cmpValues(oldMX, x, 51) || cmpValues(oldMY, y, 51)) {
        tSeed = (x ^ y) % (pool.length * 3);
        if (tSeed < pool.length) {
          seed.push(tSeed);
        }
        if (seed.length === limit) {
          for (i = 0; i < seed.length; i = i + 1) {
            random += pool[seed[i]];
            if (random.length === limit) {
              window.removeEventListener('mousemove', handleMouseEvent, true);
              callback(random);
            }
          }
        }
        oldMX = x;
        oldMY = y;
      }
    }

    if (window.DeviceOrientationEvent && mobileCheck()) {
      window.addEventListener('devicemotion', handleMotionEvent, true);
    } else {
      window.addEventListener('mousemove', handleMouseEvent, true);
    }
  };
}());
