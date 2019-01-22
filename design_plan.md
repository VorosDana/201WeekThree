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
    3C415D
    939DA8
    CBD9D6
    FDF5D9
    C65F28
    http://colormind.io/ result, is a solid start point

    939DA8
    1C3F8E
    3A4866
    3A4866
    3A4866
    From playing with adobe color picker, is potentially stronger, just make the white brighter by a little
    https://color.adobe.com/create/color-wheel/?base=2&rule=Monochromatic&selected=1&name=My%20Color%20Theme&mode=rgb&rgbvalues=0.22835242435303055,0.28198429875239117,0.3998391544117647,0.6529424302668311,0.654781723432916,0.6588235294117647,0.3762611752801616,0.4646315621992161,0.6588235294117647,0.10854257528835139,0.24900177617166788,0.5576577579273897,0.22834350074814808,0.28197327930964927,0.3998235294117647&swatchOrder=0,1,2,3,4

    Final: background #F7F7F8, text rgb(20, 49, 110). Vivid blue while maintaining contrast against white background and keeping theme from white and blue puget sound buses.
    
  Images 300px wide, 10px padding, height 400?
    Yes, 400, build to accomodate 1366x768 smaller laptops comfortably
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