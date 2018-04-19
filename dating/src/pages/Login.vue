<template>
  <div id="container">
    <div class="wrap">
        <div class="title"><Icon type="person-stalker"></Icon> 登录</div>
        <Form ref="formInline"  :model="formInline" >
          <FormItem >
              <Input type="text"  v-model.trim="formInline.username" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem >
              <Input type="text" v-show="!type" :maxlength="11" v-model.trim="formInline.phone" placeholder="手机号">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem >
              <Input type="password" v-model.trim="formInline.pwd" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem >
            <Input type="password" v-show="!type" placeholder="确认密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem v-show="type">
            <Checkbox v-model="autoLogin">自动登录</Checkbox>
          </FormItem>
          <FormItem v-show="type">
              <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
          </FormItem>
          <FormItem v-show="!type">
              <Button type="primary" @click="handleSubmit('formInline')" long>注册</Button>
          </FormItem>
      </Form>
      <div class="type">{{type?'没有账号':'已有账号'}}？<a @click="handleType()">{{type ? '立即注册' : '立即登录'}}</a></div>
    </div>
  </div>
</template>

<script>
import {indexApi} from '../common/api.js'
export default {
  name: 'login',
  data () {
    return {
      formInline: {
                    username: '',
                    pwd: '',
                    phone: '',

      },
      autoLogin: false,
      type: true //type true为登录状态，false为注册状态
    }
  },
  methods: {
         handleType(){
           this.type = !this.type
         },
         handleSubmit(){
            console.log(this.type)
            let {username,pwd,phone} = this.formInline
            const phoneTest = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
            const pwdTest = /^[a-zA-Z0-9]{6,12}$/
            if(!this.type){
                if(username.length == 0){
                    return this.$Message.error('请输入用户名！');
                }
            }
            if(!this.type){
              if(!phoneTest.test(phone)){
                return this.$Message.error('请输入正确的手机号码！');
              }
              if(!pwdTest.test(pwd)){
                return this.$Message.error('密码为6到12位数组与字母！');
              }
            }
            if(this.type){
                indexApi.login({username,pwd}).then((res) => {
                        console.log(res)
                        res = res.data
                        if(res.code){
                            return this.$Message.error(res.msg);
                        }
                        let {username,id} = res
                        let useMsg = {phone,pwd,username,id}
                        localStorage.setItem("useMsg",JSON.stringify(useMsg))
                        this.$router.push({ path: '/home'})
                    })
                return
            }
            indexApi.regist({username,pwd,phone}).then((res) => {
                        console.log(res)
                        res = res.data
                        if(res.code){
                            return this.$Message.error(res.msg);
                        }
                        this.$Message.success(res.msg + '请登陆！');
                        this.type = true;
                })
        }
    },
    watch: {
		autoLogin(){
			localStorage.setItem("autoLogin",this.autoLogin)
		}
	},
    beforeMount(){
        let useMsg = JSON.parse(localStorage.getItem("useMsg"))
        let autoLogin = JSON.parse(localStorage.getItem("autoLogin"))


        this.autoLogin = autoLogin
		if(useMsg != null){
            console.log('....')
			this.formInline.phone = useMsg.phone;
			this.formInline.pwd = useMsg.pwd;
        }
        if(this.autoLogin){
            this.handleSubmit()
        }
    }
}
</script>
<style scoped>
html, body {
  width: 100%;
  height: 100%;
}
#container{
  width: 100%;
  height: 100%;
  background: url(../../static/images/fen.jpg) no-repeat center center;
  background-size: 100% 100%;
}
#container .title{
  font-size: 20px;
  color :#2d8cf0;
  text-align: center;
  height: 50px;
}
#container .wrap{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 15px rgba(0,0,0,.3);
  background: rgba(255,255,255,.5)
}
#container .type{
  text-align: center;
  padding-right: 3px;
}
</style>
