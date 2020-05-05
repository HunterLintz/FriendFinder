var questions = [];
var friends = [];

$.get("/api/questions").then(response => {
	questions = response;
	response.forEach((question, index) => {
		$('#questions').append(
			`
				<h3>Question ${index + 1}</h3>
				<h4 class = "font-weight-normal border-bottom">${question}</h4>
				<div class="form-group">
					<select class="form-control w-50" id="q-${index + 1}">
						<option value="">Select an Option</option>
						<option value="1">1 (Strongly Disagree)</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5 (Strongly Agree)</option>
					</select>
				</div>
			`
		);
	});
});

$.get("/api/friends").then(response => {
	friends = response;
	$("#submit-btn").attr("disabled",false);
	$("#submit-btn").html("Submit");
});

function checkQuestions() {
	event.preventDefault();
	if($("#Name").val() == null || $("#Img").val() == null){
		cantContinue();
	}else{
		questions.forEach((question,i) => {
				if(!$("#q-"+ (i+1)).val()){
					cantContinue();
				};
		});
		findFriend();
		$.post("/api/friends", newPerson).then(function(data){
			if(data == "Created"){
				alert("New person added to the friends list")
			}else{
				alert("Error adding person to the friends list")
			};
		});
	};
};

var scoreDiff = 0
var	currentBF;
var	currentBFScore = 0;
var newPerson;
function findFriend() {
	newPerson = {
		"name":$("#Name").val(),
		"photo":$("#Img").val(),
		"scores":[]
	}
	questions.forEach((question,i) => {
		newPerson.scores.push($("#q-" + (i+1)).val())
	});
	friends.forEach((friend,i) => {
		scoreDiff = 0;
		friend.scores.forEach((score,oi) => {
			var diff = Math.abs(score - newPerson.scores[oi]);
			scoreDiff += diff;
		});
		if (i == 0){
			currentBF = friend;
			currentBFScore = scoreDiff;
		}else{
			if (scoreDiff < currentBFScore){
				currentBF = friend;
				currentBFScore = scoreDiff;
			};	
		};
	});
	scoreDiff = 0;
	currentBFScore = 0;
	$("#match-name").text(currentBF.name);
	$("#match-img").attr("src", currentBF.photo);
	$("#results-modal").modal();
};

function cantContinue(){
	alert("oof");
};
