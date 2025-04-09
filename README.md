## 项目-工具箱 实现版本 v2

---

### 项目目录结构

### datas.json 数据文件说明

1. dataTitle：左侧菜单和右侧分类标题名称
2. classNames：对应 菜单/标题 组件的 class 类名，用于样式控制
3. dataAllUrls：所有 分类+url 的键名。详情如下：
   1. dataProgramStudy：编程学习
   2. dataDevelopTools：开发工具
   3. dataTextTools：文本工具
   4. dataImagesTools：图片工具
   5. dataVideoTools：视频工具
   6. dataOthers：其它

### 数据文件更新指南

1. 新增网址分类/标题时，编辑 `dataTitle` 字段和 `classNames` 字段。二者数量必须一致。
2. 新增网址时，根据其分类在对应的 `dataAllUrls` 字段下的分类字段中更新即可。
3. 删除同理

### 网址/Url 格式

```json
[
    "链接",
    "图标/Logo",
    "标题",
    "描述"
]
```