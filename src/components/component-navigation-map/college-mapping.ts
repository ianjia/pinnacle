import { BasicCollegeDataMapping } from "./data-types";

export const collegeMapping: Map<string, BasicCollegeDataMapping> = new Map([
    ["Princeton University", { loc: { latitude: 40.3430, longitude: -74.6514 }, url: new URL("https://www.princeton.edu/"),
        resource: {
            admission: new URL("https://admission.princeton.edu/"),
            niche: new URL("https://www.niche.com/colleges/princeton-university/"),
            appily: new URL("https://www.appily.com/colleges/princeton-university"),
            unigo: new URL("https://www.unigo.com/colleges/princeton-university")
            }
     }],

     ["Massachusetts Institute of Technology (MIT)", { loc: { latitude: 42.3601, longitude: -71.0942 }, url: new URL("https://www.mit.edu/"),
        resource: {
            admission: new URL("https://mitadmissions.org/"),
            niche: new URL("https://www.niche.com/colleges/massachusetts-institute-of-technology/"),
            appily: new URL("https://www.appily.com/colleges/massachusetts-institute-of-technology"),
            unigo: new URL("https://www.unigo.com/colleges/massachusetts-institute-of-technology")
            }         
     }],

     ["Harvard University", { loc: { latitude: 42.3770, longitude: -71.1167 }, url: new URL("https://www.harvard.edu/"),
        resource: {
            admission: new URL("https://college.harvard.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/harvard-university/"),
            appily: new URL("https://www.appily.com/colleges/harvard-university"),
            unigo: new URL("https://www.unigo.com/colleges/harvard-university")
            }          
    }],
     
     ["Stanford University", { loc: { latitude: 37.4275, longitude: -122.1697 }, url: new URL("https://www.stanford.edu/"),
      resource: {
        admission: new URL("https://admission.stanford.edu/"),
        niche: new URL("https://www.niche.com/colleges/stanford-university/"),
        appily: new URL("https://www.appily.com/colleges/stanford-university"),
        unigo: new URL("https://www.unigo.com/colleges/stanford-university")
        }          
    }],

    ["Yale University", { loc: { latitude: 41.3163, longitude: -72.9223 }, url: new URL("https://www.yale.edu/"),
        resource: {
            admission: new URL("https://www.yale.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/yale-university/"),
            appily: new URL("https://www.appily.com/colleges/yale-university"),
            unigo: new URL("https://www.unigo.com/colleges/yale-university")
            }       
     }],

     ["University of Chicago", { loc: { latitude: 41.7886, longitude: -87.5987 }, url: new URL("https://www.uchicago.edu/"),
        resource: {
            admission: new URL("https://www.uchicago.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-chicago/"),
            appily: new URL("https://www.appily.com/colleges/university-of-chicago"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-chicago")
            }      
    }],

    ["Johns Hopkins University", { loc: { latitude: 39.3299, longitude: -76.6205 }, url: new URL("https://www.jhu.edu/"),
        resource: {
            admission: new URL("https://www.jhu.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/johns-hopkins-university/"),
            appily: new URL("https://www.appily.com/colleges/johns-hopkins-university"),
            unigo: new URL("https://www.unigo.com/colleges/johns-hopkins-university")
            }     
    }],

    ["University of Pennsylvania", { loc: { latitude: 39.9522, longitude: -75.1932 }, url: new URL("https://www.upenn.edu/"),
        resource: {
            admission: new URL("https://www.upenn.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-pennsylvania/"),
            appily: new URL("https://www.appily.com/colleges/university-of-pennsylvania"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-pennsylvania")
            }     
    }],

    ["California Institute of Technology", { loc: { latitude: 34.1377, longitude: -118.1253 }, url: new URL("https://www.caltech.edu/"),
        resource: {
            admission: new URL("https://www.admissions.caltech.edu/apply"),
            niche: new URL("https://www.niche.com/colleges/california-institute-of-technology/"),
            appily: new URL("https://www.appily.com/colleges/california-institute-of-technology"),
            unigo: new URL("https://www.unigo.com/colleges/california-institute-of-technology")
            }     
    }],

    ["Duke University", { loc: { latitude: 36.0014, longitude: -78.9382 }, url: new URL("https://www.duke.edu/"),
        resource: {
            admission: new URL("https://admissions.duke.edu/"),
            niche: new URL("https://www.niche.com/colleges/duke-university/"),
            appily: new URL("https://www.appily.com/colleges/duke-university"),
            unigo: new URL("https://www.unigo.com/colleges/duke-university")
            }     
    }],

    ["Northwestern University", { loc: { latitude: 42.0565, longitude: -87.6753 }, url: new URL("https://www.northwestern.edu/") ,
        resource: {
            admission: new URL("https://www.northwestern.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/northwestern-university/"),
            appily: new URL("https://www.appily.com/colleges/northwestern-university"),
            unigo: new URL("https://www.unigo.com/colleges/northwestern-university")
            }  
    }],

    ["Dartmouth College", { loc: { latitude: 43.7044, longitude: -72.2887 }, url: new URL("https://home.dartmouth.edu/") ,
        resource: {
            admission: new URL("https://home.dartmouth.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/dartmouth-college/"),
            appily: new URL("https://www.appily.com/colleges/dartmouth-college"),
            unigo: new URL("https://www.unigo.com/colleges/dartmouth-college")
            }  
    }],

    ["Brown University", { loc: { latitude: 41.8268, longitude: -71.4025 }, url: new URL("https://www.brown.edu/") ,
        resource: {
            admission: new URL("https://admission.brown.edu/"),
            niche: new URL("https://www.niche.com/colleges/brown-university/"),
            appily: new URL("https://www.appily.com/colleges/brown-university"),
            unigo: new URL("https://www.unigo.com/colleges/brown-university")
            }  
    }],

    ["Columbia University", { loc: { latitude: 40.8073, longitude: -73.9630 }, url: new URL("https://www.columbia.edu/"),
        resource: {
            admission: new URL("https://www.columbia.edu/content/admissions"),
            niche: new URL("https://www.niche.com/colleges/columbia-university/"),
            appily: new URL("https://www.appily.com/colleges/columbia-university-in-the-city-of-new-york"),
            unigo: new URL("https://www.unigo.com/colleges/columbia-university-in-the-city-of-new-york")
            }  
    }],

    ["Vanderbilt University", { loc: { latitude: 36.1447, longitude: -86.8027 }, url: new URL("https://www.vanderbilt.edu/"),
        resource: {
            admission: new URL("https://www.vanderbilt.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/vanderbilt-university/"),
            appily: new URL("https://www.appily.com/colleges/vanderbilt-university"),
            unigo: new URL("https://www.unigo.com/colleges/vanderbilt-university")
            }  
    }],

    ["Rice University", { loc: { latitude: 29.7174, longitude: -95.4018 }, url: new URL("https://www.rice.edu/"),
        resource: {
            admission: new URL("https://admission.rice.edu/"),
            niche: new URL("https://www.niche.com/colleges/rice-university/"),
            appily: new URL("https://www.appily.com/colleges/rice-university"),
            unigo: new URL("https://www.unigo.com/colleges/rice-university")
            }  
    }],

    ["Washington University in St. Louis", { loc: { latitude: 38.6488, longitude: -90.3108 }, url: new URL("https://wustl.edu/"),
        resource: {
            admission: new URL("https://admissions.washu.edu/"),
            niche: new URL("https://www.niche.com/colleges/washington-university-in-st-louis/"),
            appily: new URL("https://www.appily.com/colleges/washington-university-in-st-louis"),
            unigo: new URL("https://www.unigo.com/colleges/washington-university-in-st-louis")
            }  
    }],

    ["Cornell University", { loc: { latitude: 42.4534, longitude: -76.4735 }, url: new URL("https://www.cornell.edu/"),
        resource: {
            admission: new URL("https://admissions.cornell.edu/"),
            niche: new URL("https://www.niche.com/colleges/cornell-university/"),
            appily: new URL("https://www.appily.com/colleges/cornell-university"),
            unigo: new URL("https://www.unigo.com/colleges/cornell-university")
            }  
    }],

    ["University of Notre Dame", { loc: { latitude: 41.7056, longitude: -86.2353 }, url: new URL("https://www.nd.edu/"),
        resource: {
            admission: new URL("https://admissions.nd.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-notre-dame/"),
            appily: new URL("https://www.appily.com/colleges/university-of-notre-dame"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-notre-dame")
            }  
    }],

    ["Emory University", { loc: { latitude: 33.7925, longitude: -84.3240 }, url: new URL("https://www.emory.edu/") ,
        resource: {
            admission: new URL("https://apply.emory.edu/index.html"),
            niche: new URL("https://www.niche.com/colleges/emory-university/"),
            appily: new URL("https://www.appily.com/colleges/emory-university"),
            unigo: new URL("https://www.unigo.com/colleges/emory-university")
            }  
    }],

    ["Georgetown University", { loc: { latitude: 38.9076, longitude: -77.0723 }, url: new URL("https://www.georgetown.edu/"),
        resource: {
            admission: new URL("https://uadmissions.georgetown.edu/"),
            niche: new URL("https://www.niche.com/colleges/georgetown-university/"),
            appily: new URL("https://www.appily.com/colleges/georgetown-university"),
            unigo: new URL("https://www.unigo.com/colleges/georgetown-university")
            }  
    }],

    ["University of California, Berkeley", { loc: { latitude: 37.8719, longitude: -122.2585 }, url: new URL("https://www.berkeley.edu/"),
        resource: {
            admission: new URL("https://admissions.berkeley.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-california-berkeley/"),
            appily: new URL("https://www.appily.com/colleges/uc-berkeley"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-california-berkeley")
            }  
    }],

    ["University of Southern California", { loc: { latitude: 34.0224, longitude: -118.2851 }, url: new URL("https://www.usc.edu/"),
        resource: {
            admission: new URL("https://admission.usc.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-southern-california/"),
            appily: new URL("https://www.appily.com/colleges/university-of-southern-california"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-southern-california")
            }    
    }],

    ["Carnegie Mellon University", { loc: { latitude: 40.4433, longitude: -79.9426 }, url: new URL("https://www.cmu.edu/"),
        resource: {
            admission: new URL("https://www.cmu.edu/student-admission/"),
            niche: new URL("https://www.niche.com/colleges/carnegie-mellon-university/"),
            appily: new URL("https://www.appily.com/colleges/carnegie-mellon-university"),
            unigo: new URL("https://www.unigo.com/colleges/carnegie-mellon-university")
            }   
    }],

    ["University of California, Los Angeles", { loc: { latitude: 34.0689, longitude: -118.4452 }, url: new URL("https://www.ucla.edu/"),
        resource: {
            admission: new URL("https://admission.ucla.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-california-los-angeles/"),
            appily: new URL("https://www.appily.com/colleges/ucla"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-california-los-angeles")
            }   
    }],

    ["University of Michigan, Ann Arbor", { loc: { latitude: 42.2780, longitude: -83.7382 }, url: new URL("https://umich.edu/"),
        resource: {
            admission: new URL("https://admissions.umich.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-michigan-ann-arbor/"),
            appily: new URL("https://www.appily.com/colleges/university-of-michigan-ann-arbor"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-michigan-ann-arbor")
            }   
    }],

    ["University of Virginia", { loc: { latitude: 38.0336, longitude: -78.5080 }, url: new URL("https://www.virginia.edu/"),
        resource: {
            admission: new URL("https://admission.virginia.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-virginia/"),
            appily: new URL("https://www.appily.com/colleges/university-of-virginia-main-campus"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-virginia-main-campus")
            }    
    }],

    ["Wake Forest University", { loc: { latitude: 36.1350, longitude: -80.2784 }, url: new URL("https://www.wfu.edu/"),
        resource: {
            admission: new URL("https://admissions.wfu.edu/"),
            niche: new URL("https://www.niche.com/colleges/wake-forest-university/"),
            appily: new URL("https://www.appily.com/colleges/wake-forest-university"),
            unigo: new URL("https://www.unigo.com/colleges/wake-forest-university")
            }    
    }],

    ["New York University", { loc: { latitude: 40.7295, longitude: -73.9965 }, url: new URL("https://www.nyu.edu/") ,
        resource: {
            admission: new URL("https://www.nyu.edu/admissions/undergraduate-admissions.html"),
            niche: new URL("https://www.niche.com/colleges/new-york-university/"),
            appily: new URL("https://www.appily.com/colleges/new-york-university"),
            unigo: new URL("https://www.unigo.com/colleges/new-york-university")
            }    
    }],

    ["Tufts University", { loc: { latitude: 42.4075, longitude: -71.1190 }, url: new URL("https://www.tufts.edu/"),
        resource: {
            admission: new URL("https://admissions.tufts.edu/"),
            niche: new URL("https://www.niche.com/colleges/tufts-university/"),
            appily: new URL("https://www.appily.com/colleges/tufts-university"),
            unigo: new URL("https://www.unigo.com/colleges/tufts-university")
            }    
    }],

    ["University of North Carolina at Chapel Hill", { loc: { latitude: 35.9049, longitude: -79.0469 }, url: new URL("https://www.unc.edu/") ,
        resource: {
            admission: new URL("https://admissions.unc.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-north-carolina-at-chapel-hill/"),
            appily: new URL("https://www.appily.com/colleges/university-of-north-carolina-at-chapel-hill"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-north-carolina-at-chapel-hill")
            }    
    }],

    ["University of Rochester", { loc: { latitude: 43.1286, longitude: -77.6285 }, url: new URL("https://www.rochester.edu/"),
        resource: {
            admission: new URL("https://www.rochester.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/university-of-rochester/"),
            appily: new URL("https://www.appily.com/colleges/university-of-rochester"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-rochester")
            }    
    }],

    ["Boston College", { loc: { latitude: 42.3355, longitude: -71.1685 }, url: new URL("https://www.bc.edu/"),
        resource: {
            admission: new URL("https://www.bc.edu/bc-web/admission.html"),
            niche: new URL("https://www.niche.com/colleges/boston-college/"),
            appily: new URL("https://www.appily.com/colleges/boston-college"),
            unigo: new URL("https://www.unigo.com/colleges/boston-college")
            }    
    }],

    ["University of California, Santa Barbara", { loc: { latitude: 34.4139, longitude: -119.8489 }, url: new URL("https://www.ucsb.edu/"),
        resource: {
            admission: new URL("https://admissions.sa.ucsb.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-california-santa-barbara/"),
            appily: new URL("https://www.appily.com/colleges/university-of-california-santa-barbara"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-california-santa-barbara")
            }    
    }],

    ["University of Florida", { loc: { latitude: 29.6436, longitude: -82.3549 }, url: new URL("https://www.ufl.edu/") ,
        resource: {
            admission: new URL("https://admissions.ufl.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-florida/"),
            appily: new URL("https://www.appily.com/colleges/university-of-florida"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-florida")
            }    
    }],

    ["University of California, San Diego", { loc: { latitude: 32.8801, longitude: -117.2340 }, url: new URL("https://www.ucsd.edu/"),
        resource: {
            admission: new URL("https://admissions.ucsd.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-california-san-diego/"),
            appily: new URL("https://www.appily.com/colleges/university-of-california-san-diego"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-california-san-diego")
            }    
    }],

    ["University of California, Irvine", { loc: { latitude: 33.6405, longitude: -117.8443 }, url: new URL("https://www.uci.edu/"),
        resource: {
            admission: new URL("https://www.admissions.uci.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-california-irvine/"),
            appily: new URL("https://www.appily.com/colleges/university-of-california-irvine"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-california-irvine")
            }    
    }],

    ["University of Texas at Austin", { loc: { latitude: 30.2849, longitude: -97.7341 }, url: new URL("https://www.utexas.edu/") ,
        resource: {
            admission: new URL("https://admissions.utexas.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-texas-austin/"),
            appily: new URL("https://www.appily.com/colleges/the-university-of-texas-at-austin"),
            unigo: new URL("https://www.unigo.com/colleges/the-university-of-texas-at-austin")
            }    
    }],

    ["Boston University", { loc: { latitude: 42.3505, longitude: -71.1054 }, url: new URL("https://www.bu.edu/"),
        resource: {
            admission: new URL("https://www.bu.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/boston-university/"),
            appily: new URL("https://www.appily.com/colleges/boston-university"),
            unigo: new URL("https://www.unigo.com/colleges/boston-university")
            }    
    }],

    ["University of Wisconsin-Madison", { loc: { latitude: 43.0766, longitude: -89.4125 }, url: new URL("https://www.wisc.edu/"),
        resource: {
            admission: new URL("https://www.wisc.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/university-of-wisconsin-madison/"),
            appily: new URL("https://www.appily.com/colleges/university-of-wisconsin-madison"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-wisconsin-madison")
            }    
    }],

    ["University of Illinois Urbana-Champaign", { loc: { latitude: 40.1020, longitude: -88.2272 }, url: new URL("https://illinois.edu/"),
        resource: {
            admission: new URL("https://illinois.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/university-of-illinois-urbana-champaign/"),
            appily: new URL("https://www.appily.com/colleges/university-of-illinois-at-urbana-champaign"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-illinois-at-urbana-champaign")
            }    
    }],

    ["University of Georgia", { loc: { latitude: 33.9480, longitude: -83.3773 }, url: new URL("https://www.uga.edu/"),
        resource: {
            admission: new URL("https://www.admissions.uga.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-georgia/"),
            appily: new URL("https://www.appily.com/colleges/university-of-georgia"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-georgia")
            }    
    }],

    ["Ohio State University", { loc: { latitude: 40.0076, longitude: -83.0300 }, url: new URL("https://www.osu.edu/"),
        resource: {
            admission: new URL("https://undergrad.osu.edu/apply"),
            niche: new URL("https://www.niche.com/colleges/the-ohio-state-university/"),
            appily: new URL("https://www.appily.com/colleges/ohio-state-university-main-campus"),
            unigo: new URL("https://www.unigo.com/colleges/ohio-state-university-main-campus")
            }    
    }],

    ["Pepperdine University", { loc: { latitude: 34.0400, longitude: -118.7070 }, url: new URL("https://www.pepperdine.edu/") ,
        resource: {
            admission: new URL("https://www.pepperdine.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/the-ohio-state-university/"),
            appily: new URL("https://www.appily.com/colleges/pepperdine-university"),
            unigo: new URL("https://www.unigo.com/colleges/pepperdine-university")
            }    
    }],

    ["Syracuse University", { loc: { latitude: 43.0379, longitude: -76.1349 }, url: new URL("https://www.syracuse.edu/"),
        resource: {
            admission: new URL("https://www.syracuse.edu/admissions-aid/"),
            niche: new URL("https://www.niche.com/colleges/syracuse-university/"),
            appily: new URL("https://www.appily.com/colleges/syracuse-university"),
            unigo: new URL("https://www.unigo.com/colleges/syracuse-university")
            }    
    }],

    ["University of Miami", { loc: { latitude: 25.7174, longitude: -80.2784 }, url: new URL("https://www.miami.edu/"),
        resource: {
            admission: new URL("https://welcome.miami.edu/admissions/index.html"),
            niche: new URL("https://www.niche.com/colleges/university-of-miami/"),
            appily: new URL("https://www.appily.com/colleges/university-of-miami"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-miami")
            }    
    }],

    ["Purdue University", { loc: { latitude: 40.4237, longitude: -86.9212 }, url: new URL("https://www.purdue.edu/"),
        resource: {
            admission: new URL("https://www.purdue.edu/home/become-a-student/"),
            niche: new URL("https://www.niche.com/colleges/purdue-university/"),
            appily: new URL("https://www.appily.com/colleges/purdue-university-main-campus"),
            unigo: new URL("https://www.unigo.com/colleges/purdue-university-main-campus")
            }    
    }],

    ["University of Connecticut", { loc: { latitude: 41.8084, longitude: -72.2520 }, url: new URL("https://uconn.edu/"),
        resource: {
            admission: new URL("https://admissions.uconn.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-connecticut/"),
            appily: new URL("https://www.appily.com/colleges/university-of-connecticut"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-connecticut")
            }    
    }],

    ["University of Washington", { loc: { latitude: 47.6553, longitude: -122.3035 }, url: new URL("https://www.washington.edu/"),
        resource: {
            admission: new URL("https://www.washington.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/university-of-washington/"),
            appily: new URL("https://www.appily.com/colleges/university-of-washington-seattle-campus"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-washington-seattle-campus")
            }    
    }],

    ["University of Maryland, College Park", { loc: { latitude: 38.9869, longitude: -76.9426 }, url: new URL("https://www.umd.edu/"),
        resource: {
            admission: new URL("https://admissions.umd.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-maryland-college-park/"),
            appily: new URL("https://www.appily.com/colleges/university-of-maryland-college-park"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-maryland-college-park")
            }    
    }],

    ["Clemson University", { loc: { latitude: 34.6784, longitude: -82.8374 }, url: new URL("https://www.clemson.edu/") ,
        resource: {
            admission: new URL("https://www.clemson.edu/admissions/index.html"),
            niche: new URL("https://www.niche.com/colleges/clemson-university/"),
            appily: new URL("https://www.appily.com/colleges/clemson-university"),
            unigo: new URL("https://www.unigo.com/colleges/clemson-university")
            }    
    }],

    ["Pennsylvania State University", { loc: { latitude: 40.7982, longitude: -77.8599 }, url: new URL("https://www.psu.edu/"),
        resource: {
            admission: new URL("https://www.psu.edu/admission/undergraduate"),
            niche: new URL("https://www.niche.com/colleges/penn-state/"),
            appily: new URL("https://www.appily.com/colleges/penn-state-university"),
            unigo: new URL("https://www.unigo.com/colleges/pennsylvania-state-university-main-campus")
            }    
    }],

    ["Southern Methodist University", { loc: { latitude: 32.8410, longitude: -96.7845 }, url: new URL("https://www.smu.edu/"), 
        resource: {
            admission: new URL("https://www.smu.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/southern-methodist-university/"),
            appily: new URL("https://www.appily.com/colleges/southern-methodist-university"),
            unigo: new URL("https://www.unigo.com/colleges/southern-methodist-university")
            }    
    }],

    ["Texas A&M University", { loc: { latitude: 30.6150, longitude: -96.3425 }, url: new URL("https://www.tamu.edu/"),
        resource: {
            admission: new URL("https://admissions.tamu.edu/"),
            niche: new URL("https://www.niche.com/colleges/texas-a-and-m-university/"),
            appily: new URL("https://www.appily.com/colleges/texas-am-university-college-station"),
            unigo: new URL("https://www.unigo.com/colleges/texas-a-and-m-university-college-station")
            }    
    }],

    ["Fordham University", { loc: { latitude: 40.8612, longitude: -73.8857 }, url: new URL("https://www.fordham.edu/"),
        resource: {
            admission: new URL("https://www.fordham.edu/undergraduate-admission/"),
            niche: new URL("https://www.niche.com/colleges/fordham-university/"),
            appily: new URL("https://www.appily.com/colleges/fordham-university"),
            unigo: new URL("https://www.unigo.com/colleges/fordham-university")
            }    
    }],

    ["University of Pittsburgh", { loc: { latitude: 40.4443, longitude: -79.9608 }, url: new URL("https://www.pitt.edu/"),
        resource: {
            admission: new URL("https://www.pitt.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-pittsburgh/"),
            appily: new URL("https://www.appily.com/colleges/university-of-pittsburgh-pittsburgh-campus"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-pittsburgh-pittsburgh-campus")
            }    
    }],

    ["American University", { loc: { latitude: 38.9375, longitude: -77.0898 }, url: new URL("https://www.american.edu/"),
        resource: {
            admission: new URL("https://www.american.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/american-university/"),
            appily: new URL("https://www.appily.com/colleges/american-university"),
            unigo: new URL("https://www.unigo.com/colleges/american-university")
            }    
    }],

    ["Baylor University", { loc: { latitude: 31.5493, longitude: -97.1143 }, url: new URL("https://www.baylor.edu/"),
        resource: {
            admission: new URL("https://admissions.web.baylor.edu/"),
            niche: new URL("https://www.niche.com/colleges/baylor-university/"),
            appily: new URL("https://www.appily.com/colleges/baylor-university"),
            unigo: new URL("https://www.unigo.com/colleges/baylor-university")
            }    
    }],

    ["Clark University", { loc: { latitude: 42.2518, longitude: -71.8248 }, url: new URL("https://www.clarku.edu/"),
        resource: {
            admission: new URL("https://www.clarku.edu/undergraduate-admissions/"),
            niche: new URL("https://www.niche.com/colleges/clark-university/"),
            appily: new URL("https://www.appily.com/colleges/clark-university"),
            unigo: new URL("https://www.unigo.com/colleges/clark-university")
            }    
    }],

    ["Colorado School of Mines", { loc: { latitude: 39.7510, longitude: -105.2226 }, url: new URL("https://www.mines.edu/"),
        resource: {
            admission: new URL("https://www.mines.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/colorado-school-of-mines/"),
            appily: new URL("https://www.appily.com/colleges/colorado-school-of-mines"),
            unigo: new URL("https://www.unigo.com/colleges/colorado-school-of-mines")
            }    
    }],

    ["Michigan State University", { loc: { latitude: 42.7018, longitude: -84.4822 }, url: new URL("https://msu.edu/"),
        resource: {
            admission: new URL("https://admissions.msu.edu/"),
            niche: new URL("https://www.niche.com/colleges/michigan-state-university/"),
            appily: new URL("https://www.appily.com/colleges/michigan-state-university"),
            unigo: new URL("https://www.unigo.com/colleges/michigan-state-university")
            }    
    }],

    ["Stevens Institute of Technology", { loc: { latitude: 40.7440, longitude: -74.0253 }, url: new URL("https://www.stevens.edu/"),
        resource: {
            admission: new URL("https://www.stevens.edu/admission-aid/undergraduate-admissions"),
            niche: new URL("https://www.niche.com/colleges/stevens-institute-of-technology/"),
            appily: new URL("https://www.appily.com/colleges/stevens-institute-of-technology"),
            unigo: new URL("https://www.unigo.com/colleges/stevens-institute-of-technology")
            }    
    }],

    ["University of Delaware", { loc: { latitude: 39.6780, longitude: -75.7526 }, url: new URL("https://www.udel.edu/"),
        resource: {
            admission: new URL("https://www.udel.edu/apply/undergraduate-admissions/"),
            niche: new URL("https://www.niche.com/colleges/university-of-delaware/"),
            appily: new URL("https://www.appily.com/colleges/university-of-delaware"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-delaware")
            }    
    }],

    ["University of Denver", { loc: { latitude: 39.6780, longitude: -104.9610 }, url: new URL("https://www.du.edu/"),
        resource: {
            admission: new URL("https://www.du.edu/admission-aid/undergraduate"),
            niche: new URL("https://www.niche.com/colleges/university-of-denver/"),
            appily: new URL("https://www.appily.com/colleges/university-of-denver"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-denver")
            }    
    }],

    ["University of Tulsa", { loc: { latitude: 36.1539, longitude: -95.9450 }, url: new URL("https://utulsa.edu/"),
        resource: {
            admission: new URL("https://utulsa.edu/admissions/undergraduate-admission/"),
            niche: new URL("https://www.niche.com/colleges/the-university-of-tulsa/"),
            appily: new URL("https://www.appily.com/colleges/university-of-tulsa"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-tulsa")
            }    
    }],

    ["Indiana University Bloomington", { loc: { latitude: 39.1653, longitude: -86.5264 }, url: new URL("https://www.indiana.edu/"),
        resource: {
            admission: new URL("https://admissions.indiana.edu/index.html"),
            niche: new URL("https://www.niche.com/colleges/indiana-university-bloomington/"),
            appily: new URL("https://www.appily.com/colleges/indiana-university-bloomington"),
            unigo: new URL("https://www.unigo.com/colleges/indiana-university-bloomington")
            }    
    }],

    ["Marquette University", { loc: { latitude: 43.0389, longitude: -87.9300 }, url: new URL("https://www.marquette.edu/"),
        resource: {
            admission: new URL("https://www.marquette.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/marquette-university/"),
            appily: new URL("https://www.appily.com/colleges/marquette-university"),
            unigo: new URL("https://www.unigo.com/colleges/marquette-university")
            }    
    }],

    ["University of Colorado Boulder", { loc: { latitude: 40.0076, longitude: -105.2659 }, url: new URL("https://www.colorado.edu/"),
        resource: {
            admission: new URL("https://www.colorado.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-colorado-boulder/"),
            appily: new URL("https://www.appily.com/colleges/university-of-colorado-boulder"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-colorado-boulder")
            }    
    }],

    ["University of Massachusetts Amherst", { loc: { latitude: 42.3868, longitude: -72.5301 }, url: new URL("https://www.umass.edu/"),
        resource: {
            admission: new URL("https://www.umass.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-massachusetts-amherst/"),
            appily: new URL("https://www.appily.com/colleges/umass-amherst"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-massachusetts-amherst")
            }    
    }],

    ["University of Vermont", { loc: { latitude: 44.4759, longitude: -73.2121 }, url: new URL("https://www.uvm.edu/"),
        resource: {
            admission: new URL("https://www.uvm.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-vermont/"),
            appily: new URL("https://www.appily.com/colleges/university-of-vermont"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-vermont")
            }    
    }],

    ["Worcester Polytechnic Institute", { loc: { latitude: 42.2748, longitude: -71.8063 }, url: new URL("https://www.wpi.edu/"),
        resource: {
            admission: new URL("https://www.wpi.edu/admissions/undergraduate"),
            niche: new URL("https://www.niche.com/colleges/worcester-polytechnic-institute/"),
            appily: new URL("https://www.appily.com/colleges/worcester-polytechnic-institute"),
            unigo: new URL("https://www.unigo.com/colleges/worcester-polytechnic-institute")
            }    
    }],

    ["Yeshiva University", { loc: { latitude: 40.8505, longitude: -73.9290 }, url: new URL("https://www.yu.edu/"),
        resource: {
            admission: new URL("https://www.yu.edu/undergraduate-admissions"),
            niche: new URL("https://www.niche.com/colleges/yeshiva-university/"),
            appily: new URL("https://www.appily.com/colleges/yeshiva-university"),
            unigo: new URL("https://www.unigo.com/colleges/yeshiva-university")
            }    
    }],

    ["Binghamton University", { loc: { latitude: 42.0886, longitude: -75.9690 }, url: new URL("https://www.binghamton.edu/"),
        resource: {
            admission: new URL("https://www.binghamton.edu/admissions/index.html"),
            niche: new URL("https://www.niche.com/colleges/binghamton-university-suny/"),
            appily: new URL("https://www.appily.com/colleges/binghamton-university"),
            unigo: new URL("https://www.unigo.com/colleges/suny-at-binghamton")
            }    
    }],

    ["Florida State University", { loc: { latitude: 30.4419, longitude: -84.2985 }, url: new URL("https://www.fsu.edu/"),
        resource: {
            admission: new URL("https://admissions.fsu.edu/"),
            niche: new URL("https://www.niche.com/colleges/florida-state-university/"),
            appily: new URL("https://www.appily.com/colleges/florida-state-university"),
            unigo: new URL("https://www.unigo.com/colleges/florida-state-university")
            }    
    }],

    ["Miami University", { loc: { latitude: 39.5078, longitude: -84.7332 }, url: new URL("https://miamioh.edu/"),
        resource: {
            admission: new URL("https://miamioh.edu/admission-aid/index.html"),
            niche: new URL("https://www.niche.com/colleges/miami-university/"),
            appily: new URL("https://www.appily.com/colleges/miami-university-oxford"),
            unigo: new URL("https://www.unigo.com/colleges/miami-university-oxford")
            }    
    }],

    ["North Carolina State University", { loc: { latitude: 35.7847, longitude: -78.6821 }, url: new URL("https://www.ncsu.edu/"),
        resource: {
            admission: new URL("https://admissions.ncsu.edu/"),
            niche: new URL("https://www.niche.com/colleges/north-carolina-state-university/"),
            appily: new URL("https://www.appily.com/colleges/north-carolina-state-university-at-raleigh"),
            unigo: new URL("https://www.unigo.com/colleges/north-carolina-state-university-at-raleigh")
            }    
    }],

    ["SUNY College of Environmental Science and Forestry", { loc: { latitude: 43.0347, longitude: -76.1360 }, url: new URL("https://www.esf.edu/"),
        resource: {
            admission: new URL("https://www.esf.edu/admissions/index.php"),
            niche: new URL("https://www.niche.com/colleges/suny-college-of-environmental-science-and-forestry/"),
            appily: new URL("https://www.appily.com/colleges/suny-college-of-environmental-science-and-forestry"),
            unigo: new URL("https://www.unigo.com/colleges/suny-college-of-environmental-science-and-forestry")
            }    
    }],

    ["University of Iowa", { loc: { latitude: 41.6611, longitude: -91.5365 }, url: new URL("https://uiowa.edu/"),
        resource: {
            admission: new URL("https://admissions.uiowa.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-iowa/"),
            appily: new URL("https://www.appily.com/colleges/university-of-iowa"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-iowa")
            }    
    }],

    ["University of Minnesota Twin Cities", { loc: { latitude: 44.9737, longitude: -93.2354 }, url: new URL("https://twin-cities.umn.edu/"),
        resource: {
            admission: new URL("https://admissions.tc.umn.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-minnesota-twin-cities/"),
            appily: new URL("https://www.appily.com/colleges/university-of-minnesota-twin-cities"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-minnesota-twin-cities")
            }    
    }],

    ["University of Missouri", { loc: { latitude: 38.9453, longitude: -92.3280 }, url: new URL("https://missouri.edu/"),
        resource: {
            admission: new URL("https://admissions.missouri.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-missouri/"),
            appily: new URL("https://www.appily.com/colleges/university-of-missouri-columbia"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-missouri-columbia")
            }    
    }],

    ["University of Oklahoma", { loc: { latitude: 35.2072, longitude: -97.4457 }, url: new URL("https://www.ou.edu/"),
        resource: {
            admission: new URL("https://www.ou.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/university-of-oklahoma/"),
            appily: new URL("https://www.appily.com/colleges/university-of-oklahoma-norman-campus"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-oklahoma-norman-campus")
            }    
    }],

    ["University of Oregon", { loc: { latitude: 44.0448, longitude: -123.0726 }, url: new URL("https://www.uoregon.edu/"),
        resource: {
            admission: new URL("https://admissions.uoregon.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-oregon/"),
            appily: new URL("https://www.appily.com/colleges/university-of-oregon"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-oregon")
            }    
    }],

    ["University of San Diego", { loc: { latitude: 32.7714, longitude: -117.1880 }, url: new URL("https://www.sandiego.edu/"),
        resource: {
            admission: new URL("https://www.sandiego.edu/admission-and-aid/undergraduate/"),
            niche: new URL("https://www.niche.com/colleges/university-of-san-diego/"),
            appily: new URL("https://www.appily.com/colleges/university-of-san-diego"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-san-diego")
            }    
    }],

    ["University of San Francisco", { loc: { latitude: 37.7749, longitude: -122.4194 }, url: new URL("https://www.usfca.edu/"),
        resource: {
            admission: new URL("https://www.usfca.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/university-of-san-francisco/"),
            appily: new URL("https://www.appily.com/colleges/university-of-san-francisco"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-san-francisco")
            }    
    }],

    ["University of South Carolina", { loc: { latitude: 33.9965, longitude: -81.0270 }, url: new URL("https://www.sc.edu/"),
        resource: {
            admission: new URL("https://sc.edu/about/offices_and_divisions/undergraduate_admissions/"),
            niche: new URL("https://www.niche.com/colleges/university-of-south-carolina/"),
            appily: new URL("https://www.appily.com/colleges/university-of-south-carolina-columbia"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-south-carolina-columbia")
            }    
    }],

    ["University of Tennessee", { loc: { latitude: 35.9545, longitude: -83.9295 }, url: new URL("https://www.utk.edu/"),
        resource: {
            admission: new URL("https://admissions.utk.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-tennessee/"),
            appily: new URL("https://www.appily.com/colleges/the-university-of-tennessee-knoxville"),
            unigo: new URL("https://www.unigo.com/colleges/the-university-of-tennessee-knoxville")
            }    
    }],

    ["University of Utah", { loc: { latitude: 40.7649, longitude: -111.8421 }, url: new URL("https://www.utah.edu/"),
        resource: {
            admission: new URL("https://admissions.utah.edu/"),
            niche: new URL("https://www.niche.com/colleges/university-of-utah/"),
            appily: new URL("https://www.appily.com/colleges/university-of-utah"),
            unigo: new URL("https://www.unigo.com/colleges/university-of-utah")
            }    
    }],

    ["Villanova University", { loc: { latitude: 40.0374, longitude: -75.3430 }, url: new URL("https://www.villanova.edu/"),
        resource: {
            admission: new URL("https://www1.villanova.edu/university/undergraduate-admission.html"),
            niche: new URL("https://www.niche.com/colleges/villanova-university/"),
            appily: new URL("https://www.appily.com/colleges/villanova-university"),
            unigo: new URL("https://www.unigo.com/colleges/villanova-university")
            }    
    }],

    ["Virginia Tech", { loc: { latitude: 37.2284, longitude: -80.4234 }, url: new URL("https://www.vt.edu/"),
        resource: {
            admission: new URL("https://www.vt.edu/admissions/undergraduate.html"),
            niche: new URL("https://www.niche.com/colleges/virginia-tech/"),
            appily: new URL("https://www.appily.com/colleges/virginia-polytechnic-institute-and-state-university"),
            unigo: new URL("https://www.unigo.com/colleges/virginia-polytechnic-institute-and-state-university")
            }    
    }],

    ["Washington and Lee University", { loc: { latitude: 37.7900, longitude: -79.4428 }, url: new URL("https://www.wlu.edu/"),
        resource: {
            admission: new URL("https://www.wlu.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/washington-and-lee-university/"),
            appily: new URL("https://www.appily.com/colleges/washington-and-lee-university"),
            unigo: new URL("https://www.unigo.com/colleges/washington-and-lee-university")
            }    
    }],

    ["Williams College", { loc: { latitude: 42.7128, longitude: -73.2031 }, url: new URL("https://www.williams.edu/"),
        resource: {
            admission: new URL("https://www.williams.edu/admission-aid/"),
            niche: new URL("https://www.niche.com/colleges/williams-college/"),
            appily: new URL("https://www.appily.com/colleges/williams-college"),
            unigo: new URL("https://www.unigo.com/colleges/williams-college")
            }    
    }],

    ["Wellesley college", { loc: { latitude: 42.2936, longitude: -71.3065 }, url: new URL("https://www.wellesley.edu/"),
        resource: {
            admission: new URL("https://www.wellesley.edu/admission-aid"),
            niche: new URL("https://www.niche.com/colleges/wellesley-college/"),
            appily: new URL("https://www.appily.com/colleges/wellesley-college"),
            unigo: new URL("https://www.unigo.com/colleges/wellesley-college")
            }    
    }],

    ["Wesleyan University", { loc: { latitude: 41.5565, longitude: -72.6569 }, url: new URL("https://www.wesleyan.edu/"),
        resource: {
            admission: new URL("https://www.wesleyan.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/wesleyan-university/"),
            appily: new URL("https://www.appily.com/colleges/wesleyan-university"),
            unigo: new URL("https://www.unigo.com/colleges/wesleyan-university")
            }    
    }],

    ["Whitman College", { loc: { latitude: 46.0705, longitude: -118.3302 }, url: new URL("https://www.whitman.edu/"),
        resource: {
            admission: new URL("https://www.whitman.edu/admission-and-aid"),
            niche: new URL("https://www.niche.com/colleges/whitman-college/"),
            appily: new URL("https://www.appily.com/colleges/whitman-college"),
            unigo: new URL("https://www.unigo.com/colleges/whitman-college")
            }    
    }],

    ["Amherst College", { loc: { latitude: 42.3709, longitude: -72.5169 }, url: new URL("https://www.amherst.edu/"),
        resource: {
            admission: new URL("https://www.amherst.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/amherst-college/"),
            appily: new URL("https://www.appily.com/colleges/amherst-college"),
            unigo: new URL("https://www.unigo.com/colleges/amherst-college")
            }    
    }],

    ["Babson College", { loc: { latitude: 42.2993, longitude: -71.2653 }, url: new URL("https://www.babson.edu/"),
        resource: {
            admission: new URL("https://www.babson.edu/undergraduate/admission/"),
            niche: new URL("https://www.niche.com/colleges/babson-college/"),
            appily: new URL("https://www.appily.com/colleges/babson-college"),
            unigo: new URL("https://www.unigo.com/colleges/babson-college")
            }    
    }],

    ["Barnard College", { loc: { latitude: 40.8090, longitude: -73.9630 }, url: new URL("https://barnard.edu/"),
        resource: {
            admission: new URL("https://barnard.edu/admissions-aid"),
            niche: new URL("https://www.niche.com/colleges/barnard-college/"),
            appily: new URL("https://www.appily.com/colleges/barnard-college"),
            unigo: new URL("https://www.unigo.com/colleges/barnard-college")
            }    
    }],

    ["Bates College", { loc: { latitude: 44.1052, longitude: -70.2030 }, url: new URL("https://www.bates.edu/"),
        resource: {
            admission: new URL("https://www.bates.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/bates-college/"),
            appily: new URL("https://www.appily.com/colleges/bates-college"),
            unigo: new URL("https://www.unigo.com/colleges/bates-college")
            }    
    }],

    ["Beloit College", { loc: { latitude: 42.5030, longitude: -89.0300 }, url: new URL("https://www.beloit.edu/"),
        resource: {
            admission: new URL("https://www.beloit.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/beloit-college/"),
            appily: new URL("https://www.appily.com/colleges/beloit-college"),
            unigo: new URL("https://www.unigo.com/colleges/beloit-college")
            }    
    }],

    ["Bennington College", { loc: { latitude: 42.9234, longitude: -73.2460 }, url: new URL("https://www.bennington.edu/"),
        resource: {
            admission: new URL("https://www.bennington.edu/admissions-and-financial-aid"),
            niche: new URL("https://www.niche.com/colleges/bennington-college/"),
            appily: new URL("https://www.appily.com/colleges/bennington-college"),
            unigo: new URL("https://www.unigo.com/colleges/bennington-college")
            }    
    }],

    ["Bentley University", { loc: { latitude: 42.3884, longitude: -71.2200 }, url: new URL("https://www.bentley.edu/"),
        resource: {
            admission: new URL("https://www.bentley.edu/undergraduate"),
            niche: new URL("https://www.niche.com/colleges/bentley-university/"),
            appily: new URL("https://www.appily.com/colleges/bentley-university"),
            unigo: new URL("https://www.unigo.com/colleges/bentley-university")
            }    
    }],

    ["Berea College", { loc: { latitude: 37.5720, longitude: -84.2960 }, url: new URL("https://www.berea.edu/"),
        resource: {
            admission: new URL("https://www.berea.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/berea-college/"),
            appily: new URL("https://www.appily.com/colleges/berea-college"),
            unigo: new URL("https://www.unigo.com/colleges/berea-college")
            }    
    }],

    ["Bowdoin College", { loc: { latitude: 43.9088, longitude: -69.9631 }, url: new URL("https://www.bowdoin.edu/"),
        resource: {
            admission: new URL("https://www.bowdoin.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/bowdoin-college/"),
            appily: new URL("https://www.appily.com/colleges/bowdoin-college"),
            unigo: new URL("https://www.unigo.com/colleges/bowdoin-college")
            }    
    }],

    ["Brandeis University", { loc: { latitude: 42.3650, longitude: -71.2580 }, url: new URL("https://www.brandeis.edu/"),
        resource: {
            admission: new URL("https://www.brandeis.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/brandeis-university/"),
            appily: new URL("https://www.appily.com/colleges/brandeis-university"),
            unigo: new URL("https://www.unigo.com/colleges/brandeis-university")
            }    
    }],

    ["Bryn Mawr College", { loc: { latitude: 40.0250, longitude: -75.3160 }, url: new URL("https://www.brynmawr.edu/"),
        resource: {
            admission: new URL("https://www.brynmawr.edu/admissions-aid"),
            niche: new URL("https://www.niche.com/colleges/bryn-mawr-college/"),
            appily: new URL("https://www.appily.com/colleges/bryn-mawr-college"),
            unigo: new URL("https://www.unigo.com/colleges/bryn-mawr-college")
            }    
    }],

    ["Bucknell University", { loc: { latitude: 40.9545, longitude: -76.8840 }, url: new URL("https://www.bucknell.edu/"),
        resource: {
            admission: new URL("https://www.bucknell.edu/admissions-aid"),
            niche: new URL("https://www.niche.com/colleges/bucknell-university/"),
            appily: new URL("https://www.appily.com/colleges/bucknell-university"),
            unigo: new URL("https://www.unigo.com/colleges/bucknell-university")
            }    
    }],

    ["California Polytechnic State University, San Luis Obispo", { loc: { latitude: 35.3050, longitude: -120.6625 }, url: new URL("https://www.calpoly.edu/"),
        resource: {
            admission: new URL("https://www.calpoly.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/cal-poly-san-luis-obispo/"),
            appily: new URL("https://www.appily.com/colleges/cal-poly-san-luis-obispo"),
            unigo: new URL("https://www.unigo.com/colleges/california-polytechnic-state-university-san-luis-obispo")
            }    
    }],

    ["Carleton College", { loc: { latitude: 44.4600, longitude: -93.1530 }, url: new URL("https://www.carleton.edu/"),
        resource: {
            admission: new URL("https://www.carleton.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/carleton-college/"),
            appily: new URL("https://www.appily.com/colleges/carleton-college"),
            unigo: new URL("https://www.unigo.com/colleges/carleton-college")
            }    
    }],

    ["Case Western Reserve University", { loc: { latitude: 41.5010, longitude: -81.6070 }, url: new URL("https://case.edu/"),
        resource: {
            admission: new URL("https://case.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/case-western-reserve-university/"),
            appily: new URL("https://www.appily.com/colleges/case-western-reserve-university"),
            unigo: new URL("https://www.unigo.com/colleges/case-western-reserve-university")
            }    
    }],

    ["Claremont McKenna College", { loc: { latitude: 34.1020, longitude: -117.7070 }, url: new URL("https://www.cmc.edu/"),
        resource: {
            admission: new URL("https://www.cmc.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/claremont-mckenna-college/"),
            appily: new URL("https://www.appily.com/colleges/claremont-mckenna-college"),
            unigo: new URL("https://www.unigo.com/colleges/claremont-mckenna-college")
            }    
    }],

    ["Colby College", { loc: { latitude: 44.5650, longitude: -69.6620 }, url: new URL("https://www.colby.edu/"),
        resource: {
            admission: new URL("https://afa.colby.edu/"),
            niche: new URL("https://www.niche.com/colleges/colby-college/"),
            appily: new URL("https://www.appily.com/colleges/colby-college"),
            unigo: new URL("https://www.unigo.com/colleges/colby-college")
            }    
    }],

    ["Colgate University", { loc: { latitude: 42.8180, longitude: -75.5400 }, url: new URL("https://www.colgate.edu/"),
        resource: {
            admission: new URL("https://www.colgate.edu/admission-aid"),
            niche: new URL("https://www.niche.com/colleges/colgate-university/"),
            appily: new URL("https://www.appily.com/colleges/colgate-university"),
            unigo: new URL("https://www.unigo.com/colleges/colgate-university")
            }    
    }],

    ["College of the Holy Cross", { loc: { latitude: 42.2390, longitude: -71.8100 }, url: new URL("https://www.holycross.edu/"),
        resource: {
            admission: new URL("https://www.holycross.edu/admissions-aid"),
            niche: new URL("https://www.niche.com/colleges/college-of-the-holy-cross/"),
            appily: new URL("https://www.appily.com/colleges/college-of-the-holy-cross"),
            unigo: new URL("https://www.unigo.com/colleges/college-of-the-holy-cross")
            }    
    }],

    ["College of William & Mary", { loc: { latitude: 37.2707, longitude: -76.7090 }, url: new URL("https://www.wm.edu/"),
        resource: {
            admission: new URL("https://www.wm.edu/admission/undergraduateadmission/"),
            niche: new URL("https://www.niche.com/colleges/william-and-mary/"),
            appily: new URL("https://www.appily.com/colleges/william-mary"),
            unigo: new URL("https://www.unigo.com/colleges/college-of-william-and-mary")
            }    
    }],

    ["Colorado College", { loc: { latitude: 38.8462, longitude: -104.8260 }, url: new URL("https://www.coloradocollege.edu/"),
        resource: {
            admission: new URL("https://www.coloradocollege.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/colorado-college/"),
            appily: new URL("https://www.appily.com/colleges/colorado-college"),
            unigo: new URL("https://www.unigo.com/colleges/colorado-college")
            }    
    }],

    ["Connecticut College", { loc: { latitude: 41.3780, longitude: -72.1060 }, url: new URL("https://www.conncoll.edu/"),
        resource: {
            admission: new URL("https://www.conncoll.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/connecticut-college/"),
            appily: new URL("https://www.appily.com/colleges/connecticut-college"),
            unigo: new URL("https://www.unigo.com/colleges/connecticut-college")
            }    
    }],

    ["Davidson College", { loc: { latitude: 35.5000, longitude: -80.8480 }, url: new URL("https://www.davidson.edu/"),
        resource: {
            admission: new URL("https://www.davidson.edu/admission-and-financial-aid"),
            niche: new URL("https://www.niche.com/colleges/davidson-college/"),
            appily: new URL("https://www.appily.com/colleges/davidson-college"),
            unigo: new URL("https://www.unigo.com/colleges/davidson-college")
            }    
    }],

    ["DePauw University", { loc: { latitude: 39.6400, longitude: -86.8610 }, url: new URL("https://www.depauw.edu/"),
        resource: {
            admission: new URL("https://www.depauw.edu/admission-aid/"),
            niche: new URL("https://www.niche.com/colleges/depauw-university/"),
            appily: new URL("https://www.appily.com/colleges/depauw-university"),
            unigo: new URL("https://www.unigo.com/colleges/depauw-university")
            }    
    }],

    ["Dickinson College", { loc: { latitude: 40.2020, longitude: -77.2000 }, url: new URL("https://www.dickinson.edu/"),
        resource: {
            admission: new URL("https://www.dickinson.edu/homepage/287/admissions"),
            niche: new URL("https://www.niche.com/colleges/dickinson-college/"),
            appily: new URL("https://www.appily.com/colleges/dickinson-college"),
            unigo: new URL("https://www.unigo.com/colleges/dickinson-college")
            }    
    }],

    ["Drexel University", { loc: { latitude: 39.9566, longitude: -75.1899 }, url: new URL("https://drexel.edu/"),
        resource: {
            admission: new URL("https://drexel.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/drexel-university/"),
            appily: new URL("https://www.appily.com/colleges/drexel-university"),
            unigo: new URL("https://www.unigo.com/colleges/drexel-university")
            }    
    }],

    ["Earlham College", { loc: { latitude: 39.8260, longitude: -84.9030 }, url: new URL("https://earlham.edu/"),
        resource: {
            admission: new URL("https://earlham.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/earlham-college/"),
            appily: new URL("https://www.appily.com/colleges/earlham-college"),
            unigo: new URL("https://www.unigo.com/colleges/earlham-college")
            }    
    }],

    ["Elon University", { loc: { latitude: 36.1020, longitude: -79.5020 }, url: new URL("https://www.elon.edu/"),
        resource: {
            admission: new URL("https://www.elon.edu/u/admissions/undergraduate/"),
            niche: new URL("https://www.niche.com/colleges/elon-university/"),
            appily: new URL("https://www.appily.com/colleges/elon-university"),
            unigo: new URL("https://www.unigo.com/colleges/elon-university")
            }    
    }],

    ["Emerson College", { loc: { latitude: 42.3520, longitude: -71.0650 }, url: new URL("https://www.emerson.edu/"),
        resource: {
            admission: new URL("https://emerson.edu/admissions-aid/undergraduate-admission"),
            niche: new URL("https://www.niche.com/colleges/emerson-college/"),
            appily: new URL("https://www.appily.com/colleges/emerson-college"),
            unigo: new URL("https://www.unigo.com/colleges/emerson-college")
            }    
    }],

    ["Franklin & Marshall College", { loc: { latitude: 40.0470, longitude: -76.3160 }, url: new URL("https://www.fandm.edu/"),
        resource: {
            admission: new URL("https://www.fandm.edu/apply/"),
            niche: new URL("https://www.niche.com/colleges/franklin-and-marshall-college/"),
            appily: new URL("https://www.appily.com/colleges/franklin-and-marshall-college"),
            unigo: new URL("https://www.unigo.com/colleges/franklin-and-marshall-college")
            }    
    }],

    ["Furman University", { loc: { latitude: 34.9240, longitude: -82.4380 }, url: new URL("https://www.furman.edu/"),
        resource: {
            admission: new URL("https://www.furman.edu/admissions-aid/"),
            niche: new URL("https://www.niche.com/colleges/furman-university/"),
            appily: new URL("https://www.appily.com/colleges/furman-university"),
            unigo: new URL("https://www.unigo.com/colleges/furman-university")
            }    
    }],

    ["George Washington University", { loc: { latitude: 38.8990, longitude: -77.0470 }, url: new URL("https://www.gwu.edu/"),
        resource: {
            admission: new URL("https://undergraduate.admissions.gwu.edu/"),
            niche: new URL("https://www.niche.com/colleges/george-washington-university/"),
            appily: new URL("https://www.appily.com/colleges/george-washington-university"),
            unigo: new URL("https://www.unigo.com/colleges/george-washington-university")
            }    
    }],

    ["Gettysburg College", { loc: { latitude: 39.8350, longitude: -77.2340 }, url: new URL("https://www.gettysburg.edu/"),
        resource: {
            admission: new URL("https://www.gettysburg.edu/admissions-aid/"),
            niche: new URL("https://www.niche.com/colleges/gettysburg-college/"),
            appily: new URL("https://www.appily.com/colleges/gettysburg-college"),
            unigo: new URL("https://www.unigo.com/colleges/gettysburg-college")
            }    
    }],

    ["Grinnell College", { loc: { latitude: 41.7510, longitude: -92.7190 }, url: new URL("https://www.grinnell.edu/"),
        resource: {
            admission: new URL("https://www.grinnell.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/grinnell-college/"),
            appily: new URL("https://www.appily.com/colleges/grinnell-college"),
            unigo: new URL("https://www.unigo.com/colleges/grinnell-college")
            }    
    }],

    ["Hamilton College", { loc: { latitude: 43.0500, longitude: -75.4060 }, url: new URL("https://www.hamilton.edu/"),
        resource: {
            admission: new URL("https://www.hamilton.edu/ADMISSION"),
            niche: new URL("https://www.niche.com/colleges/hamilton-college/"),
            appily: new URL("https://www.appily.com/colleges/hamilton-college"),
            unigo: new URL("https://www.unigo.com/colleges/hamilton-college")
            }    
    }],

    ["Harvey Mudd College", { loc: { latitude: 34.1060, longitude: -117.7100 }, url: new URL("https://www.hmc.edu/"),
        resource: {
            admission: new URL("https://www.hmc.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/harvey-mudd-college/"),
            appily: new URL("https://www.appily.com/colleges/harvey-mudd-college"),
            unigo: new URL("https://www.unigo.com/colleges/harvey-mudd-college")
            }    
    }],

    ["Haverford College", { loc: { latitude: 40.0120, longitude: -75.3080 }, url: new URL("https://www.haverford.edu/"),
        resource: {
            admission: new URL("https://www.haverford.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/haverford-college/"),
            appily: new URL("https://www.appily.com/colleges/haverford-college"),
            unigo: new URL("https://www.unigo.com/colleges/haverford-college")
            }    
    }],

    ["Hobart and William Smith Colleges", { loc: { latitude: 42.8590, longitude: -76.9850 }, url: new URL("https://www.hws.edu/"),
        resource: {
            admission: new URL("https://www.hws.edu/admissions/default.aspx"),
            niche: new URL("https://www.niche.com/colleges/hobart-and-william-smith/"),
            appily: new URL("https://www.appily.com/colleges/hobart-and-william-smith"),
            unigo: new URL("https://www.unigo.com/colleges/hobart-william-smith-colleges")
            }    
    }],

    ["Illinois Institute of Technology", { loc: { latitude: 41.8340, longitude: -87.6270 }, url: new URL("https://www.iit.edu/"),
        resource: {
            admission: new URL("https://www.iit.edu/admissions-aid/undergraduate-admission"),
            niche: new URL("https://www.niche.com/colleges/illinois-institute-of-technology/"),
            appily: new URL("https://www.appily.com/colleges/illinois-institute-of-technology"),
            unigo: new URL("https://www.unigo.com/colleges/illinois-institute-of-technology")
            }    
    }],

    ["Ithaca College", { loc: { latitude: 42.4220, longitude: -76.4940 }, url: new URL("https://www.ithaca.edu/"),
        resource: {
            admission: new URL("https://www.ithaca.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/ithaca-college/"),
            appily: new URL("https://www.appily.com/colleges/ithaca-college"),
            unigo: new URL("https://www.unigo.com/colleges/ithaca-college")
            }    
    }],

    ["Kenyon College", { loc: { latitude: 40.3750, longitude: -82.3960 }, url: new URL("https://www.kenyon.edu/"),
        resource: {
            admission: new URL("https://www.kenyon.edu/admissions-aid/"),
            niche: new URL("https://www.niche.com/colleges/kenyon-college/"),
            appily: new URL("https://www.appily.com/colleges/kenyon-college"),
            unigo: new URL("https://www.unigo.com/colleges/kenyon-college")
            }    
    }],

    ["Lafayette College", { loc: { latitude: 40.7000, longitude: -75.2090 }, url: new URL("https://www.lafayette.edu/"),
        resource: {
            admission: new URL("https://admissions.lafayette.edu/"),
            niche: new URL("https://www.niche.com/colleges/lafayette-college/"),
            appily: new URL("https://www.appily.com/colleges/lafayette-college"),
            unigo: new URL("https://www.unigo.com/colleges/lafayette-college")
            }    
    }],

    ["Lawrence University", { loc: { latitude: 44.2610, longitude: -88.4010 }, url: new URL("https://www.lawrence.edu/"),
        resource: {
            admission: new URL("https://www.lawrence.edu/admissions-aid"),
            niche: new URL("https://www.niche.com/colleges/lawrence-university/"),
            appily: new URL("https://www.appily.com/colleges/lawrence-university"),
            unigo: new URL("https://www.unigo.com/colleges/lawrence-university")
            }    
    }],

    ["Lehigh University", { loc: { latitude: 40.6060, longitude: -75.3780 }, url: new URL("https://www1.lehigh.edu/"),
        resource: {
            admission: new URL("https://www1.lehigh.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/lehigh-university/"),
            appily: new URL("https://www.appily.com/colleges/lehigh-university"),
            unigo: new URL("https://www.unigo.com/colleges/lehigh-university")
            }    
    }],

    ["Macalester College", { loc: { latitude: 44.9390, longitude: -93.1680 }, url: new URL("https://www.macalester.edu/"),
        resource: {
            admission: new URL("https://www.macalester.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/macalester-college/"),
            appily: new URL("https://www.appily.com/colleges/macalester-college"),
            unigo: new URL("https://www.unigo.com/colleges/macalester-college")
            }    
    }],

    ["Middlebury College", { loc: { latitude: 44.0100, longitude: -73.1770 }, url: new URL("https://www.middlebury.edu/"),
        resource: {
            admission: new URL("https://www.middlebury.edu/college/admissions"),
            niche: new URL("https://www.niche.com/colleges/middlebury-college/"),
            appily: new URL("https://www.appily.com/colleges/middlebury-college"),
            unigo: new URL("https://www.unigo.com/colleges/middlebury-college")
            }    
    }],

    ["Mount Holyoke College", { loc: { latitude: 42.2550, longitude: -72.5750 }, url: new URL("https://www.mtholyoke.edu/"),
        resource: {
            admission: new URL("https://www.mtholyoke.edu/admission"),
            niche: new URL("https://www.niche.com/colleges/mount-holyoke-college/"),
            appily: new URL("https://www.appily.com/colleges/mount-holyoke-college"),
            unigo: new URL("https://www.unigo.com/colleges/mount-holyoke-college")
            }    
    }],

    ["Northeastern University", { loc: { latitude: 42.3390, longitude: -71.0890 }, url: new URL("https://www.northeastern.edu/"),
        resource: {
            admission: new URL("https://www.northeastern.edu/admissions/"),
            niche: new URL("https://www.niche.com/colleges/northeastern-university/"),
            appily: new URL("https://www.appily.com/colleges/northeastern-university"),
            unigo: new URL("https://www.unigo.com/colleges/northeastern-university")
            }    
    }],

    ["Oberlin College", { loc: { latitude: 41.2930, longitude: -82.2170 }, url: new URL("https://www.oberlin.edu/"),
        resource: {
            admission: new URL("https://www.oberlin.edu/admissions-and-aid"),
            niche: new URL("https://www.niche.com/colleges/oberlin-college/"),
            appily: new URL("https://www.appily.com/colleges/oberlin-college"),
            unigo: new URL("https://www.unigo.com/colleges/oberlin-college")
            }    
    }],

    ["Occidental College", { loc: { latitude: 34.1260, longitude: -118.2110 }, url: new URL("https://www.oxy.edu/"),
        resource: {
            admission: new URL("https://www.oxy.edu/admission-aid"),
            niche: new URL("https://www.niche.com/colleges/occidental-college/"),
            appily: new URL("https://www.appily.com/colleges/occidental-college"),
            unigo: new URL("https://www.unigo.com/colleges/occidental-college")
            }    
    }],

    ["Pitzer College", { loc: { latitude: 34.1050, longitude: -117.7100 }, url: new URL("https://www.pitzer.edu/"),
        resource: {
            admission: new URL("https://www.pitzer.edu/admission-aid"),
            niche: new URL("https://www.niche.com/colleges/pitzer-college/"),
            appily: new URL("https://www.appily.com/colleges/pitzer-college"),
            unigo: new URL("https://www.unigo.com/colleges/pitzer-college")
            }    
    }],

    ["Pomona College", { loc: { latitude: 34.0970, longitude: -117.7110 }, url: new URL("https://www.pomona.edu/"),
        resource: {
            admission: new URL("https://www.pomona.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/pomona-college/"),
            appily: new URL("https://www.appily.com/colleges/pomona-college"),
            unigo: new URL("https://www.unigo.com/colleges/pomona-college")
            }    
    }],

    ["Reed College", { loc: { latitude: 45.4810, longitude: -122.6300 }, url: new URL("https://www.reed.edu/"),
        resource: {
            admission: new URL("https://www.reed.edu/admission-aid/"),
            niche: new URL("https://www.niche.com/colleges/reed-college/"),
            appily: new URL("https://www.appily.com/colleges/reed-college"),
            unigo: new URL("https://www.unigo.com/colleges/reed-college")
            }    
    }],

    ["Rensselaer Polytechnic Institute", { loc: { latitude: 42.7300, longitude: -73.6780 }, url: new URL("https://www.rpi.edu/"),
        resource: {
            admission: new URL("https://admissions.rpi.edu/"),
            niche: new URL("https://www.niche.com/colleges/rensselaer-polytechnic-institute/"),
            appily: new URL("https://www.appily.com/colleges/rensselaer-polytechnic-institute"),
            unigo: new URL("https://www.unigo.com/colleges/rensselaer-polytechnic-institute")
            }    
    }],

    ["Rhodes College", { loc: { latitude: 35.1550, longitude: -89.9900 }, url: new URL("https://www.rhodes.edu/"),
        resource: {
            admission: new URL("https://www.rhodes.edu/admission-aid"),
            niche: new URL("https://www.niche.com/colleges/rhodes-college/"),
            appily: new URL("https://www.appily.com/colleges/rhodes-college"),
            unigo: new URL("https://www.unigo.com/colleges/rhodes-college")
            }    
    }],

    ["Scripps College", { loc: { latitude: 34.1030, longitude: -117.7100 }, url: new URL("https://www.scrippscollege.edu/"),
        resource: {
            admission: new URL("https://www.scrippscollege.edu/admission/"),
            niche: new URL("https://www.niche.com/colleges/scripps-college/"),
            appily: new URL("https://www.appily.com/colleges/scripps-college"),
            unigo: new URL("https://www.unigo.com/colleges/scripps-college")
            }    
    }],

    ["Skidmore College", { loc: { latitude: 43.0960, longitude: -73.7840 }, url: new URL("https://www.skidmore.edu/"),
        resource: {
            admission: new URL("https://www.skidmore.edu/admissions/index.php"),
            niche: new URL("https://www.niche.com/colleges/skidmore-college/"),
            appily: new URL("https://www.appily.com/colleges/skidmore-college"),
            unigo: new URL("https://www.unigo.com/colleges/skidmore-college")
            }    
    }],

    ["Smith College", { loc: { latitude: 42.3180, longitude: -72.6400 }, url: new URL("https://www.smith.edu/"),
        resource: {
            admission: new URL("https://www.smith.edu/admission-aid"),
            niche: new URL("https://www.niche.com/colleges/smith-college/"),
            appily: new URL("https://www.appily.com/colleges/smith-college"),
            unigo: new URL("https://www.unigo.com/colleges/smith-college")
            }    
    }],

    ["St. Lawrence University", { loc: { latitude: 44.5900, longitude: -75.1620 }, url: new URL("https://www.stlawu.edu/"),
        resource: {
            admission: new URL("https://www.stlawu.edu/admissions"),
            niche: new URL("https://www.niche.com/colleges/st-lawrence-university/"),
            appily: new URL("https://www.appily.com/colleges/st-lawrence-university"),
            unigo: new URL("https://www.unigo.com/colleges/st-lawrence-university")
            }    
    }],
    ["Swarthmore College", { loc: { latitude: 39.9060, longitude: -75.3550 }, url: new URL("https://www.swarthmore.edu/") }],
    ["Trinity College", { loc: { latitude: 41.7470, longitude: -72.6900 }, url: new URL("https://www.trincoll.edu/") }],
    ["Georgia Institute of Technology", { loc: { latitude: 33.7756, longitude: -84.3963 }, url: new URL("https://www.gatech.edu/") }],
    ["University of California, Davis", { loc: { latitude: 38.5382, longitude: -121.7617 }, url: new URL("https://www.ucdavis.edu/") }],
    ["University of California, Santa Cruz", { loc: { latitude: 36.9916, longitude: -122.0583 }, url: new URL("https://www.ucsc.edu/") }],
    ["University of California, Riverside", { loc: { latitude: 33.9737, longitude: -117.3281 }, url: new URL("https://www.ucr.edu/") }],
    ["University of Arizona", { loc: { latitude: 32.2319, longitude: -110.9501 }, url: new URL("https://www.arizona.edu/") }],
    ["Arizona State University", { loc: { latitude: 33.4242, longitude: -111.9281 }, url: new URL("https://www.asu.edu/") }],
    ["Rutgers University–New Brunswick", { loc: { latitude: 40.5000, longitude: -74.4474 }, url: new URL("https://www.rutgers.edu/") }],
    ["University of Kansas", { loc: { latitude: 38.9597, longitude: -95.2449 }, url: new URL("https://www.ku.edu/") }],
    ["University of Nebraska–Lincoln", { loc: { latitude: 40.8200, longitude: -96.7005 }, url: new URL("https://www.unl.edu/") }],
    ["University of Kentucky", { loc: { latitude: 38.0317, longitude: -84.5037 }, url: new URL("https://www.uky.edu/") }],
    ["University of Cincinnati", { loc: { latitude: 39.1317, longitude: -84.5155 }, url: new URL("https://www.uc.edu/") }],
    ["University of Illinois at Chicago", { loc: { latitude: 41.8715, longitude: -87.6498 }, url: new URL("https://www.uic.edu/") }],
    ["University of Texas at Dallas", { loc: { latitude: 32.9858, longitude: -96.7501 }, url: new URL("https://www.utdallas.edu/") }],
    ["Stony Brook University (SUNY)", { loc: { latitude: 40.9120, longitude: -73.1237 }, url: new URL("https://www.stonybrook.edu/") }],
    ["University of Alabama", { loc: { latitude: 33.2098, longitude: -87.5413 }, url: new URL("https://www.ua.edu/") }],
    ["Auburn University", { loc: { latitude: 32.6036, longitude: -85.4866 }, url: new URL("https://www.auburn.edu/") }],
    ["George Mason University", { loc: { latitude: 38.8323, longitude: -77.3097 }, url: new URL("https://www.gmu.edu/") }],
    ["University of Colorado Denver", { loc: { latitude: 39.7456, longitude: -105.0055 }, url: new URL("https://www.ucdenver.edu/") }],
    ["Kansas State University", { loc: { latitude: 39.1911, longitude: -96.5805 }, url: new URL("https://www.k-state.edu/") }],
    ["Oklahoma State University", { loc: { latitude: 36.1257, longitude: -97.0663 }, url: new URL("https://go.okstate.edu/") }],
    ["Vassar College", { loc: { latitude: 41.6869, longitude: -73.8966 }, url: new URL("https://www.vassar.edu/") }],
    ["Sarah Lawrence College", { loc: { latitude: 40.9350, longitude: -73.8431 }, url: new URL("https://www.sarahlawrence.edu/") }],
    ["College of Wooster", { loc: { latitude: 40.8106, longitude: -81.9368 }, url: new URL("https://www.wooster.edu/") }],
    ["Wheaton College (IL)", { loc: { latitude: 41.8661, longitude: -88.1070 }, url: new URL("https://www.wheaton.edu/") }],
    ["Denison University", { loc: { latitude: 40.0748, longitude: -82.5209 }, url: new URL("https://denison.edu/") }],
    ["Sewanee The University of the South", { loc: { latitude: 35.2037, longitude: -85.9211 }, url: new URL("https://new.sewanee.edu/") }],
    ["Gustavus Adolphus College", { loc: { latitude: 44.3248, longitude: -93.9703 }, url: new URL("https://gustavus.edu/") }],
    ["St. Olaf College", { loc: { latitude: 44.4599, longitude: -93.1685 }, url: new URL("https://wp.stolaf.edu/") }],
    ["Lewis & Clark College", { loc: { latitude: 45.4500, longitude: -122.6700 }, url: new URL("https://www.lclark.edu/") }],
    ["Hendrix College", { loc: { latitude: 35.0990, longitude: -92.4428 }, url: new URL("https://www.hendrix.edu/") }],
    ["University of South Florida", { loc: { latitude: 28.0587, longitude: -82.4139 }, url: new URL("https://www.usf.edu/") }],
    ["Texas Tech University", { loc: { latitude: 33.5843, longitude: -101.8783 }, url: new URL("https://www.ttu.edu/") }],
    ["University of Houston", { loc: { latitude: 29.7199, longitude: -95.3422 }, url: new URL("https://www.uh.edu/") }],
    ["Florida International University", { loc: { latitude: 25.7560, longitude: -80.3749 }, url: new URL("https://www.fiu.edu/") }],
    ["Temple University", { loc: { latitude: 39.9810, longitude: -75.1555 }, url: new URL("https://www.temple.edu/") }],
    ["Loyola University Chicago", { loc: { latitude: 41.9995, longitude: -87.6583 }, url: new URL("https://www.luc.edu/") }],
    ["Seton Hall University", { loc: { latitude: 40.7429, longitude: -74.2465 }, url: new URL("https://www.shu.edu/") }],
    ["University of New Hampshire", { loc: { latitude: 43.1389, longitude: -70.9331 }, url: new URL("https://www.unh.edu/") }],
    ["University of Rhode Island", { loc: { latitude: 41.4862, longitude: -71.5290 }, url: new URL("https://www.uri.edu/") }],
    ["University of Maine", { loc: { latitude: 44.8980, longitude: -68.6671 }, url: new URL("https://umaine.edu/") }],
]);
