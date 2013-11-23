(function(win){
	var R = win.R = {
		animation:{
			role1:{
				name:"role1",
				height:392,//小图高度
				width:302,//小图宽度
				frames:{
					stand:{
						startIndex:0,
						num:1
					},
					standUp:{
						startIndex:2,
						num:3
					},
					sitDown:{
						startIndex:0,
						num:3
					},
					lookLeft:{
						startIndex:5,
						num:3
					},
					lookRight:{
						startIndex:8,
						num:3
					}
				}	
			},
			role2:{
				name:"role2",
				height:392,//小图高度
				width:302,//小图宽度
				frames:{
					stand:{
						startIndex:0,
						num:1
					},
					standUp:{
						startIndex:2,
						num:3
					},
					sitDown:{
						startIndex:0,
						num:3
					},
					lookLeft:{
						startIndex:5,
						num:3
					},
					lookRight:{
						startIndex:8,
						num:3
					}
				}	
			},
			role3:{
				name:"role3",
				height:392,//小图高度
				width:302,//小图宽度
				frames:{
					stand:{
						startIndex:0,
						num:1
					},
					standUp:{
						startIndex:2,
						num:3
					},
					sitDown:{
						startIndex:0,
						num:3
					},
					lookLeft:{
						startIndex:5,
						num:3
					},
					lookRight:{
						startIndex:8,
						num:3
					}
				}	
			}
		},
		images:{
			role1:"img/role/role1.png",
			role2:"img/role/role2.png",
			role3:"img/role/role3.png"		
		},
		sounds:{
			role1:{
				sitDown:"sound/dun/beibeidun.wav",
				name:"sound/name/beibei.wav"
			},
			role2:{
				sitDown:"sound/dun/xiaoheidun2.wav",
				name:"sound/name/xiaohei.wav"
			},
			role3:{
				sitDown:"sound/dun/nanadun.wav",
				name:"sound/name/nana.wav"
			},
		    system:{
			start: 'sound/kaishi.wav',
			lose: 'sound/lose.wav',
			win: 'sound/win.wav'
		    }
		}
	};
})(window);