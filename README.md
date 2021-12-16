# CS765-subgroups
- Zachary Baklund
- Brandon Tran

## Dependencies
- HTML / CSS / Javascript (Web)
- [D3.js](https://github.com/d3/d3) 
- [Node.js](https://nodejs.org/en/) 
(*optionally* used for local development)
- [http-server (npm)](https://www.npmjs.com/package/http-server)
- [git-lfs](https://git-lfs.github.com/)
(used for large file tracking)

## How to deploy and debug locally
Install http-server
`npm install --global http-server`

Navigate to code directory containing the index.html file.\
Run `http-server -c-1`

Then when serving the static webpage locally navigate to localhost
`http://127.0.0.1:8080/index.html`

From there anytime you update the html file or the script file the changes will update on the local copy after saving and making sure to disable cach on the localhost

## Live Site

https://zbaklund.github.io/cs765-subgroups/

## Subgroup "Interest" Thresholding

https://user-images.githubusercontent.com/22531969/146293778-437fbb37-56cb-4f3b-b95a-558832bd4e39.mp4

As you can see the **threshold** interactive input allows us to show or unshow *interesting* subsets of the data
via graying them out if they are lower than the currently selected thresholding value. This allows some degree of experimentation at a top level of what a user may not want to be focused on when exploring subgroups. However, this color change does not impact the interactivity of the data displayed in those regions, if the user so chooses to they can still select and show histogram charts for those sections. It simply affords the opportunity to the user to have any distributions below a certain value highlighted so they can know at a glance what may or may not be interesting to them based on that selection.

## Data Exploration and Interactive Hierarchical Model

https://user-images.githubusercontent.com/22531969/146294523-325278fc-0041-40c8-81e3-f648f6059302.mp4

Our interactive model allows you to explore the catagorical / hierarchical data in an intuitive fashion, you can click on and expand arcs around the center circle in the sunburst visualization model to explode and expose their leaf nodes in greater detail and precision. From there a record is tracked of your selections being made so you can make a mental note for later if you find a particular subgroup selection interesting.

## Standard Chart Generation Based on Interaction

https://user-images.githubusercontent.com/22531969/146295213-400e73cd-825e-4aec-ac93-93612f8b8901.mp4

And finally after deciding on an arranged selection of subgroups you can generate a standard chart based off of the selected data.
