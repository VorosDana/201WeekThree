'use strict';

var voteOptions = [];
var resultsTable = document.getElementById('results-table');
// var optionOne = document.getElementById('option-one');
// var optionTwo = document.getElementById('option-two');
// var optionThree = document.getElementById('option-three');
var disallowedNumbers = [];
var images = document.getElementsByTagName('img');
var totalVotes = 0;
var voteOptionNames = [];

function VoteItem(image, name) {
  this.name = name;
  this.image = image;
  this.votes = 0;
  this.timesAppeared = 0;
  voteOptions.push(this);
  voteOptionNames.push(this.name);
}

VoteItem.prototype.render = function(imgLoc) {
  // this.timesAppeared++;
  imgLoc.src = this.image;
  imgLoc.nextElementSibling.textContent = this.name;
  imgLoc.nextElementSibling.id = this.name;
}

function voteHandler(event) {
  // var firstItem = voteOptions[voteOptionNames.indexOf(optionOne.nextElementSibling.id)];
  // var secondItem = voteOptions[voteOptionNames.indexOf(optionTwo.nextElementSibling.id)];
  // var thirdItem = voteOptions[voteOptionNames.indexOf(optionThree.nextElementSibling.id)];
  // firstItem.timesAppeared++;
  // secondItem.timesAppeared++;
  // thirdItem.timesAppeared++;

  for(var i=0; i<images.length; i++)
  {
    voteOptions[voteOptionNames.indexOf(images[i].nextElementSibling.id)].timesAppeared++;
  }

  var votedItem = voteOptions[voteOptionNames.indexOf(event.target.id)];
  votedItem.votes++;
  totalVotes++;
  if(totalVotes > 24) {
    document.getElementById('show-results').disabled = false;
  }
  updateVoteOptions();
}

VoteItem.prototype.winPercent = function() {
  return (this.votes / this.timesAppeared * 100).toString() + '%';
}

// generates three -unique- numbers from 0 to the number of vote options -1
function generateVoteOptions() {
  var output = [];
  while(output.length < images.length) {
    var test = Math.floor(Math.random() * voteOptions.length);
    if(!disallowedNumbers.includes(test)) {
      output.push(test);
      disallowedNumbers.push(test);
    }
  }
  disallowedNumbers = output;
  return output;
}

function updateVoteOptions() {
  var newOptions = generateVoteOptions();

  // voteOptions[newOptions[0]].render(optionOne);
  // voteOptions[newOptions[1]].render(optionTwo);
  // voteOptions[newOptions[2]].render(optionThree);

  for(var i=0; i<images.length; i++) {
    voteOptions[newOptions[i]].render(images[i]);
  }
}

function renderTable() {
  resultsTable.innerHTML = '';

  var tableRow = resultsTable.insertRow(0);
  var cellEl = document.createElement('th');
  cellEl.textContent = 'Item';
  tableRow.appendChild(cellEl);
  cellEl = document.createElement('th');
  cellEl.textContent = 'Times Voted For';
  tableRow.appendChild(cellEl);
  cellEl = document.createElement('th');
  cellEl.textContent ='Times Appeared';
  tableRow.appendChild(cellEl);
  cellEl = document.createElement('th');
  cellEl.textContent = '% Wins';
  tableRow.appendChild(cellEl);

  for(var i = 0; i < voteOptions.length; i++) {
    tableRow = resultsTable.insertRow(i+1);
    cellEl = document.createElement('td');
    cellEl.textContent = voteOptions[i].name;
    tableRow.appendChild(cellEl);
    cellEl = document.createElement('td');
    cellEl.textContent = voteOptions[i].votes;
    tableRow.appendChild(cellEl);
    cellEl = document.createElement('td');
    cellEl.textContent = voteOptions[i].timesAppeared;
    tableRow.appendChild(cellEl);
    cellEl = document.createElement('td');
    cellEl.textContent = voteOptions[i].winPercent();
    tableRow.appendChild(cellEl);
  }
}

new VoteItem('img/bag.jpg', 'Roller Bag');
new VoteItem('img/banana.jpg', 'Banana Slicer');
new VoteItem('img/bathroom.jpg', 'Tablet Stand');
new VoteItem('img/boots.jpg', 'Toeless Rain Boots');
new VoteItem('img/breakfast.jpg', 'Breakfast Staion');
new VoteItem('img/bubblegum.jpg', 'Bubble Gum');
new VoteItem('img/chair.jpg', 'Chair');
new VoteItem('img/cthulhu.jpg', 'Elder God');
new VoteItem('img/dog-duck.jpg', 'Dog Mask');
new VoteItem('img/dragon.jpg', 'Dragon Meat');
new VoteItem('img/pen.jpg', 'Pen');
new VoteItem('img/pet-sweep.jpg', 'Pet Sweeper');
new VoteItem('img/scissors.jpg', 'Pizza Scissors');
new VoteItem('img/shark.jpg', 'Shark Sleeping Bag');
new VoteItem('img/sweep.png', 'Mommy\s Little Sweeper');
new VoteItem('img/tauntaun.jpg', 'Fantasy Sleeping Bag');
new VoteItem('img/unicorn.jpg', 'Unicorn Meat');
new VoteItem('img/usb.gif', 'Tentacle USB Drive');
new VoteItem('img/water-can.jpg', 'Novelty Watering Can');
new VoteItem('img/wine-glass.jpg', 'Novelty Jumbo Wine Glass');

// optionOne.nextElementSibling.addEventListener('click', voteHandler);
// optionTwo.nextElementSibling.addEventListener('click', voteHandler);
// optionThree.nextElementSibling.addEventListener('click', voteHandler);

for(var i=0; i<images.length; i++) {
  images[i].nextElementSibling.addEventListener('click', voteHandler);
}

document.getElementById('show-results').addEventListener('click', renderTable);

updateVoteOptions();
