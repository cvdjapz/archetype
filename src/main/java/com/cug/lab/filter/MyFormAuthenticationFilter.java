package com.cug.lab.filter;

import com.cug.lab.model.SysUser;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**

 * @Description:    自定义FormAuthenticationFilter
 * @Author:         lzt
 * @CreateDate:     2019/1/14
 * @Version:        1.0
 */
public class MyFormAuthenticationFilter extends FormAuthenticationFilter {
    /*自定义session失效跳转页面
      successUrl配置只是做为一种附加配置，只有session中没有用户请求地址时才会使用successUrl。
      系统默认的是认证成功后跳转到上一次请求的路径，如果是首次请求，那shiro就会跳转到默认虚拟路径“/”，
      所以为了改变其登录后的地址，选择继承并重写
    */
    // 制定session跳转url
    private final String successUrl = "/homepage.page";

    //可以改变UsernameParam
  /*  public MyFormAuthenticationFilter() {
        super();
        super.setUsernameParam("userName");
        super.setPasswordParam("passWord");
    }*/

    @Override
    protected void issueSuccessRedirect(ServletRequest request, ServletResponse response) throws Exception {
        WebUtils.issueRedirect(request, response, successUrl, null, true);
    }

    /*
     * 默认的isAccessAllowed在判断有用户登录时直接返回true，后面的拦截器就不会继续执行，所以登录之后，
     * 在不退出登录的情况下，返回登录界面是无法登录的，所以在这里重写方法，如果判断存在已经登录的用户
     * 在执行登录之前将其退出
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
    {
        //退出已登录用户
        Subject subject = this.getSubject(request, response);
        if(subject.getPrincipal() != null){
            subject.logout();
        }
        return super.isAccessAllowed(request, response, mappedValue);
    }


}
