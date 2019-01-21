HTML
  Company header
  Explanation of premise
  Display of pictures
  Voting functionality
  Show results only after 25 votes
  *May require image editing to maintain aspect ratio*

CSS
  960px design standard will work nicely
  Color scheme:
    based on Sound Transit bus design, white with blue wave pattern below midline
    
  Images 300px wide, 10px padding, height 400?
  Background: try to replicate waves?
  Have empty <img> to prep for js manipulation

  Fonts:
    Data: sans-serif or monospace
    Premise, image labels and button text: serif
    Title: custom

JS
  Build containers for each image, including number of votes and number of times it has appeared
  Store image containers in an array
  Check img/ for the images? <- stretch
  On page load or vote, put random images into the waiting <img> in the html
  Ensure that each item only shows once per shuffle
  Force shuffle to use least shown items? "No, sample size is large enough to make that counterproductive"
  After 25 votes, enable a button to show results
  On pushing that button, add a table showing each image and its statistics