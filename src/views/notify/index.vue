<template>
  <div class="app-container">
    <div style="background: #fff;width:100%">
      <el-row :gutter="40" class="widthHeight" style="margin:0;padding-top:20px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form ref="form" class="option" :model="formData" label-width="75px" :inline="true">
            <el-form-item label="标题查询">
              <el-input
                clearable
                placeholder="请输入公告标题"
                style="width: 193px;"
              />
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                style="width: 193px;"
                type="date"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd 00:00:00"
              />
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                style="width: 193px;"
                type="date"
                placeholder="选择结束时间"
                value-format="yyyy-MM-dd 23:59:59"
              />
            </el-form-item>

            <el-form-item style="margin-left:0.5rem">
              <el-button
                type="primary"
                style="margin-right:10px;"
              >查询公告</el-button>
              <el-button
                type="primary"
                style="margin-right:10px;"
              >新增公告</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="list"
            element-loading-text="Loading"
            highlight-current-row
            stripe
            style="margin-top:10px;"
            :header-cell-style="{background:'#F2F6FD'}"
          >
            <el-table-column label="序号" type="index" min-width="50">
              <template
                slot-scope="scope"
              >{{ scope.$index + (formData.pageNumber - 1) * formData.pageSize + 1 }}</template>
            </el-table-column>
            <el-table-column label="公告标题" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.title" />
              </template>
            </el-table-column>
            <el-table-column label="发布人" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.createUserName" />
              </template>
            </el-table-column>
            <el-table-column label="发布状态" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.status|statusFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发布时间">
              <template slot-scope="scope">{{ scope.row.publishTime|timeFormat }}</template>
            </el-table-column>
            <el-table-column align="left" prop="created_at" label="操作" width="240px">
              <template slot-scope="scope">
                <el-link
                  size="mini"
                  type="primary"
                  plain
                  style="margin-right:10px;"
                >详情</el-link>
                <el-link
                  size="mini"
                  v-show="scope.row.status != '1'"
                  type="primary"
                  style="margin-right:10px;"
                  plain
                >编辑</el-link>
                <el-link
                  v-show="scope.row.status != '1'"
                  size="mini"
                  type="primary"
                  plain
                >发布</el-link>
                <!-- 测试用删除按钮 -->
                <!-- <el-button size="mini" type="primary" plain  @click="delmsg(scope.row.msgId)" >删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData:{},
      list:[]
    }
  }
};
</script>
<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 0;
  margin-right: 10px;
}
</style>
