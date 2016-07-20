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
         "id" : "a"
      },
      {
         "name" : "B",
         "id" : "b"
      },
      {
         "name" : "C",
         "id" : "c"
      },
      {
         "name" : "D",
         "id" : "d"
      },
      {
         "name" : "E",
         "id" : "e"
      },
      {
         "name" : "F",
         "id" : "f"
      },
      {
         "name" : "G",
         "id" : "g"
      }
   ],
   "links" : [
      {
         "source" : 0,
         "target" : 1,
         "value" : 40
      },
      {
         "source" : 0,
         "target" : 2,
         "value" : 60
      },
      {
         "source" : 2,
         "target" : 3,
         "value" : 30
      },
      {
         "source" : 2,
         "target" : 4,
         "value" : 10
      },
      {
         "source" : 3,
         "target" : 5,
         "value" : 10
      },
      {
         "source" : 3,
         "target" : 6,
         "value" : 20
      }
  	]
	}
}