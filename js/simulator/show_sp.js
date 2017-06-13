/**
 * スマートフォン用シミュ表示の構成管理
**/
// ---------------------------------
$(function () {
	var w_width = window.innerWidth;
	var w_height = window.innerHeight;
	if (w_width < 600) {
		var s_top = $("div#sim_top");
		var s_ally = $("div.sim_ally");
		var s_enem = $("div.sim_enemy");
		var s_panl = $("div.sim_panel");
		var s_ads = $("div.simu_ads");

		s_enem.insertBefore(s_ally);
		s_panl.insertBefore(s_ally);
		s_ads.insertBefore(s_top);
	}
	
	// 横持ち状態で横幅が800pxない場合には縮小表示する
	if(w_width > w_height && w_width < 800 && w_width >= 600){
		$('meta[name="viewport"]').attr("content", "width=800");
	}
});