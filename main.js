document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Otvoren';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) 
  {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } 
  else 
  {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(e, id)
{
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++)
    {
        if (issues[i].id == id)
        {
            issues[i].status = 'Zatvoren';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    e.preventDefault();
    fetchIssues();
}

function updateData()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
            
            console.log(xhttp.responseText);
            var data = JSON.parse(xhttp.responseText);
            var issue = {
                id: data['user_id'],
                description: data['user_frist'],
                severity: data['user_last'],
                assignedTo: data['user_id'],
                status: data['user_id']
              }
              issues.push(issue);
              console.log(issues);
	    }
	};
	xhttp.open("GET", "https://domica.xyz/jiranium/storedata.php", true);
	xhttp.send();
}

function deleteIssue(e, id)
{
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++)
    {
        if (issues[i].id == id)
        {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    e.preventDefault();
    fetchIssues();
}

function fetchIssues() 
{
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    updateData();

    issuesList.innerHTML = '';
  
    for (var i = 0; i < issues.length; i++) {
  
      issuesList.innerHTML +=   '<div class="well">'+
                                '<h6>Issue ID: ' + issues[i].id + '</h6>'+
                                '<p><span class="label label-info">' + issues[i].status + '</span></p>'+
                                '<h3>' + issues[i].description + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span> ' + issues[i].severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span> ' + issues[i].assignedTo + '</p>'+
                                '<a href="#" onclick="setStatusClosed(event, \''+issues[i].id+'\')" class="btn btn-warning">Zatvori</a> '+
                                '<a href="#" onclick="deleteIssue(event, \''+issues[i].id+'\')" class="btn btn-danger">Obrisi</a>'+
                                '</div>';
    
    }
}