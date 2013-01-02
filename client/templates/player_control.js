Template.player_control.events({
    'click input.next':function(){
        selected_list().playNextSongOn(player());
    },
    'click input.play':function(){
        player().play();
        PlayerStatus.fromDocument({key: "PLAY", list_id: selected_list()._id, user_id: my_user_id, created_at: Date.now()}).save();
    },
    'click input.pause':function(){
        player().pause();
        PlayerStatus.fromDocument({key: "PAUSE", list_id: selected_list()._id, user_id: my_user_id, created_at: Date.now()}).save();
    }
});