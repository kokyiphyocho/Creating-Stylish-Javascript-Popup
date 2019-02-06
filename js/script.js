var lcListBox = React.createElement("ul", { className : "listbox" },
						React.createElement('li', { id: '_item1', 'ea-command': '@cmd%itemclick' }, 'Item 1'),
						React.createElement('li', { id: '_item2', 'ea-command': '@cmd%itemclick' }, 'Item 2'),
						React.createElement('li', { id: '_item3', 'ea-command': '@cmd%itemclick' }, 'Item 3'),
						React.createElement('li', { id: '_item4', 'ea-command': '@cmd%itemclick' }, 'Item 4'),
						React.createElement('li', { id: '_item5', 'ea-command': '@cmd%itemclick' }, 'Item 5'));

var lcPopUpTitle        = React.createElement("div", { className: 'title' },
						  React.createElement('div', { id       : '_titletext' }, 'Message'),
						  React.createElement('div', { className: 'closebuttondiv' },
								React.createElement('a', { id: '_closebutton', 'ea-command': '@cmd%cancelpopup' }, '\uf00d')));
var lcPopUpContent      = React.createElement("div", { className: "content", 'fa-messagetemplate': 'You choose "$ITEM".' }, 'You choose Item 1');
var lcPopUpButton       = React.createElement("div", { className: "buttondiv" },
								React.createElement("a", { id: '_okbutton', 'ea-command': '@cmd%closepopup' }, 'OK'));

var lcPopUpbox          = React.createElement("div", { className: 'popupbox' }, lcPopUpTitle, lcPopUpContent, lcPopUpButton);

var lcPopUpOverlay = React.createElement("div", { className: 'popupoverlay' }, lcPopUpbox);

$(document).ready(function () {
	ReactDOM.render(lcListBox, document.getElementById('_maincontainer'));
	ReactDOM.render(lcPopUpOverlay, document.getElementById('_popupcontainer'));            
	AppManager.Init();
});
	
var AppManager = (function () {
	var clDeferred;
	var clListBox;
	var clPopUpOverlay;
	var clPopUpContent;

	return {
				Init: function () 
				{
					clListBox           = $(document).find('ul.listbox');                            
					clPopUpOverlay      = $(document).find('div.popupoverlay');
					clPopUpContent      = clPopUpOverlay.find('div.content');

					$(document).find('[ea-command]').unbind('click');
					$(document).find('[ea-command]').click(AppManager.HandlerOnClick);                            
				},

				ShowPopup : function(paItemName)
				{
					clDeferred = $.Deferred();

					if (clPopUpOverlay && clPopUpContent)
					{                                
						var lcTextTemplate = clPopUpContent.attr('fa-messagetemplate');
						lcTextTemplate = lcTextTemplate.replace('$ITEM', paItemName);

						clPopUpContent.text(lcTextTemplate || '');
						clPopUpOverlay.attr('fa-show', 'true');
					}

					return (clDeferred);
				},
				ClosePopUp : function()
				{
					clPopUpOverlay.removeAttr('fa-show');
				},
				SetActiveItem : function(paElement)
				{
					if (paElement)
					{                                
						AppManager.ShowPopup(paElement.text()).done(function(paResult)
						{
							if (paResult == 'ok') {
								clListBox.find('li').removeAttr('fa-active');
								paElement.attr('fa-active', 'true');
							}
						});
					}
				},
				HandlerOnClick : function(paEvent)
				{
					paEvent.preventDefault();

					var lcCommand = $(this).attr('ea-command');
					lcCommand = lcCommand.substring(lcCommand.indexOf('%') + 1);

					switch(lcCommand)
					{
						case 'itemclick':
							{
								AppManager.SetActiveItem($(this));
								break;
							}

						case 'closepopup':
							{
								AppManager.ClosePopUp();
								if (clDeferred) clDeferred.resolve('ok');
							}

						case 'cancelpopup':
							{                                        
								AppManager.ClosePopUp();
								if (clDeferred) clDeferred.resolve('cancel');
							}
					}
					
				}
		  }
})();