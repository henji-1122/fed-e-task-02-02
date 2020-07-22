#### 一、简答题
* **1、Webpack的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。**   
解析：
    - 初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果；
    - 开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译；
    - 指定入口：从配置的entry入口，解析文件构建AST语法树，找出依赖，递归依赖；
    - 编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
    - 完成模块编译并输出：递归完后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk；
    - 输出完成：输出所有的chunk到文件系统。
    

* **2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路**     
解析：   
Loader和Plugin是webpack的核心机制，Loader负责资源文件从输入到输出的转换，也可以从一个loader处理后的结果交给下一个loader处理，通过多个loader完成一个功能，实现整个项目的打包。   
Plugin是为了增强webpack自动化方面的能力，即解决除了资源加载以外其他的自动化工作。 相比于Loader，Plugin的能力范围更宽广，因为Loader只在加载模块时使用，而Plugin的作用触及webpack工作的每个环节
开发Loader思路：Loader是一个管道机制，就是将加载到的资源文件使用不同的loader最终将资源文件的内容转换为javascript代码输出，最终实现打包。   
开发Plugin思路：通过钩子机制实现，即在webpack工作的整个过程的每个环节都有可以扩展的钩子函数，在开发插件时就可以往这些环节的钩子上挂载不同的任务扩展webpack的能力。
      





---
#### 二、编程题
**1、使用 Webpack 实现 Vue 项目打包任务
具体任务及说明：**

先下载任务的基础代码：百度网盘链接:https://pan.baidu.com/s/1pJl4k5KgyhD2xo8FZIms8Q 提取码: zrdd

这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构

有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）

这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

尽可能的使用上所有你了解到的功能和特性