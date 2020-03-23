# API / REDUX working example 

List of launches from the api at https://api.spacexdata.com/v3/launches on the basis of React + Redux

See the unfinished work-in-progress live app --> https://react-launches-app.herokuapp.com/
## Quick Start

To run this app locally just clone, install dependencies, run `npm start`, and then navigate to `localhost:3000`

## Optimized Build

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>

## Notes on Assessment 

- The assessment asked to use https://api.spacexdata.com/v2/launches as the api end point. This is no longer available SpaceX has upgraded to https://api.spacexdata.com/v3/launches  
- The assessment asked to specific .svg files for the images. I would prefer to use font-awesome, or other standard icon libraries. These icons also came in the wrong color, and instead of using a color-overlay to fix the color I would usually opt to change the colors and resave the images. My illustrator license ran out a while back, and I currently don't have any way to change the colors of an .svg file. So I just left them as if. 
- I used reactstrap, a bootstrap like component system for react. This npm package has some issues with putting cell-spacing, thus it was not implemented. If this was a client or paid gig, I would go back and fix these table issues. The likely solution is to use a different npm package. I limited myself to 2 hours of work on this assessment and didn't get have time to fix this issue. I would likely make a PR on the react-strap project if I was planning to continue to use the package.  
- I also added a few features relating to filtering, this includes a search bar filter and an additional column called, "mission name". This was added as if this was real product I would imagine this "mission name" would be the most recognizable information for SpaceX launches.  
- I spent some time trying to figure out "badges" but in there was no information in the api that was related to "badges", perhaps this is a legacy feature from V2? 
- When programming, the time to code is a very important aspect of coding. I worked to optimize the application but didn't dive too far into optimization as a product like this would likely not benefit from a developer spending another x hours to optimize the systems. There are small optimizations that could be made, but given the scope of the work (an unpaid assessment that will never be seen by a client), there isn't really too much a reason to spend more than 2 hours working on it.  
- When developing one of my main goals was to "lower the mental overhead" of everything I code. This means, that is it easy for another developer to take over this code base and how can make my code the easiest to read. This results in breaking complex (a === b) : c ? d statements in to multi-branch if statements, choosing good variable names, and writing code where it easy to understand the intent of the developer.   
- This code was developed using basic styling and reactstrap for filing. In my many react project usually I stick to a single component framework like Grommet, or Material UI. In this assessment, I wanted to use a seperate framework than the ones I normally use, so I choose reactstrap. This framework ended up being less flexible than I would like, thus I would likely not use it again.  
- I would likely implement a different file system if there were more components or complexity. This file systems would be componet_folder/component/(then have two files a container and the component). If there was more complexity would also likely do a separate component for the checkboxes. Given this scope of work, this would infact increase the mental overhead so these both architectural decisions leaned towards readability and simplicity over multiple files/folders.  
- In the requirements of this assessment it shows a check box with the words "land success", the api didn't have any information relating to "land success", but did have a "launch success". I assumed this was meant to say "launch success" and filter on whether the launch was a success or not. In the app this was implemented as "launch success". 
