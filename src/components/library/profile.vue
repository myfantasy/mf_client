<template>
  <div class="content_wrapper root">
    <div class="content_only_center panel padding_in_panel">

      <div class="flexRowBWStretch">
        <div class="grow1"></div>
        <div class="profile_image z-depth-2">
          <img :src="user.picture_url" 
            class="profile_image_img materialboxed"
          />
        </div>
        <div class="online_status" :class="{online: user.status == 'online',
                                            offline: user.status == 'offline',
                                            deleted: user.status == 'deleted',
                                            blocked: user.status == 'blocked',
                                            }">
          <i class="status_icon z-depth-1"/>
          <span class="status_text">{{convert_status_code_to_text(user.status)}}</span>
        </div>
      </div>
      <div class="flexRowBWStretch">
        <div class="input-field panel_input_field head_input">
            <input type="text" class="validate" v-model="user.name">
            <label class="active">Name</label>
        </div>
      </div>

      <div class="flexRowBWStretch">
        <div class="input-field panel_input_field">
            <input type="text" class="validate" v-model="user.name">
            <label class="active">Name</label>
        </div>
        <div class="input-field panel_input_field">
            <input type="text" class="validate" v-model="user.name">
            <label class="active">Name</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

var user_status_aliases = {
  'online':'в сети',
  'offline':'не в сети',
  'deleted': 'удален',
  'blocked': 'заблокирован'


}

export default {
  name: "MyProfile",
  props: {},
  data() {
    return {
      user:{
        name: 'Alice from Wonderland',
        picture_url:'https://lh6.googleusercontent.com/Iu6kBW1YVRvBShe9-5s6OL5X7x2Vr-BOTsqxPJYMwjLlCAbAwtiqoMpjQhnVuPY5TTIfQRa_dpmnP4Gd5Wb-=w2560-h1309',
        status:'deleted'
      }
    };
  },
  methods: {
    convert_status_code_to_text(code){
      return user_status_aliases[code];
    }
  },
  mounted(){
    $(this.$el).find('.materialboxed').materialbox();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.root{
  margin-top: 150px;
}
.grow1, .online_status{
  display: flex;
  flex-basis: 100px;
  flex-grow: 1;
}
.profile_image{
  border-radius: 50%;
  border: 5px solid #EF6C00;
  width: 310px;
  height: 310px;
  box-sizing: border-box;
  margin-top: -170px;
  margin-bottom: 40px;
  overflow: hidden;


  .profile_image_img{
      
      width: 100%;
      height: 100%;
  }
}

.online_status{
  align-self: flex-start;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  margin-top: 0px;
  padding-right: 0px;
  .status_icon{
    display: flex;

    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 5px;
    background: transparent;
    border: 1px solid gray;
    box-sizing: border-box;
  }
  .status_text{

  }
  &.online{
    .status_icon{
      border-color: rgb(0, 180, 0);
      background: rgb(0,180,0);
    }
  }
  &.offline{
    .status_icon{
      border-color: rgb(190, 190, 190);
      background: rgb(190,190,190);
    }
  }
  &.deleted{
    .status_icon{
      border-color: rgb(180, 0, 0);
      background: rgb(180, 0, 0);
    }
  }
  &.blocked{
    .status_icon{
      border-color: rgb(180, 0, 0);
      background: rgb(180, 0, 0);
    }
  }
}

.panel_input_field{
  margin-top:10px;
  margin-bottom: 10px;
  margin-right: 6px;
  margin-left: 6px;
  position: relative;
  flex-grow: 1;
  flex-basis: 150px;
}

.head_input{
  input{
    font-size: 40px;
    font-weight: 400;
    text-align: center;
  }
  label{
    
    text-align: center;
  }
  &.input-field label:not(.label-icon).active {
    -webkit-transform: translateY(-26px) scale(0.8);
    transform: translateY(-26px) scale(0.8);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
}

</style>
