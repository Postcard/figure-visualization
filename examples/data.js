export default {
	BarChart:{
  	x:'letter',
  	y:'count',
	  values:[
	    {
	        "letter": "A",
	        "count": 1
	    },
	    {
	        "letter": "B",
	        "count": 3
	    },
	    {
	        "letter": "C",
	        "count": 3
	    },
	    {
	        "letter": "D",
	        "count": 4
	    },
	    {
	        "letter": "E",
	        "count": 1
	    },
	    {
	        "letter": "F",
	        "count": 4
	    },
	    {
	        "letter": "G",
	        "count": 2
	    },
	    {
	        "letter": "H",
	        "count": 4
	    },
	    {
	        "letter": "I",
	        "count": 3
	    },
	    {
	        "letter": "J",
	        "count": 3
	    },
	    {
	        "letter": "K",
	        "count": 1
	    },
	    {
	        "letter": "L",
	        "count": 2
	    }
		]
	},
	Leaderboard:{
  	x:'count',
  	y:'letter',
	  values:[
	    {
	        "letter": "A",
	        "count": 143
	    },
	    {
	        "letter": "B",
	        "count": 346
	    },
	    {
	        "letter": "C",
	        "count": 301
	    },
	    {
	        "letter": "D",
	        "count": 409
	    },
	    {
	        "letter": "E",
	        "count": 19
	    }
		]
	},
	Sankey:{
   "nodes" : [
      {
         "name" : "A",
         "id" : "a",
         "value": 100
      },
      {
         "name" : "B",
         "id" : "b",
         "value": 80
      },
      {
         "name" : "C",
         "id" : "c",
         "value": 50
      },
      {
         "name" : "D",
         "id" : "d",
         "value": 30
      },
      {
         "name" : "E",
         "id" : "e",
         "value": 10
      },
      {
         "name" : "F",
         "id" : "f",
         "value": 10
      },
      {
         "name" : "G",
         "id" : "g",
         "value": 5
      }
   ],
   "links" : [
      {
         "source" : "a",
         "target" : "b"
      },
      {
         "source" : "b",
         "target" : "c"
      },
      {
         "source" : "b",
         "target" : "d"
      },
      {
         "source" : "c",
         "target" : "e"
      },
      {
         "source" : "c",
         "target" : "f"
      },
      {
         "source" : "c",
         "target" : "g"
      }
  	]
	}
}