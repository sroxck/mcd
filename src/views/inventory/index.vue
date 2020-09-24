<template>
  <div class="app-container">
     <el-row style="margin-bottom:20px">
      <el-input placeholder="请输入餐厅名称,按回车查询" size="small" prefix-icon="el-icon-search" v-model="query" @change="queryTable" style="width:280px;"></el-input>
      <el-button @click="dialogFormVisible = true" size="small" style="margin-left:10px;">新增餐厅</el-button>
      <el-button style @click="getList()" size="small">重置</el-button>
    </el-row>
    <!-- 展示的表格 绑定 tableList数组-->
    <el-table v-loading="listLoading" :data="tableList" element-loading-text="Loading" size="small" border fit stripe>
      <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
      <el-table-column label="配件名称" prop="name"></el-table-column>
      <el-table-column v-for="(item,index) in 31" :key="index" :label="(item)+''" width="40px" :prop="`time.jiuyue.${item}`" ></el-table-column>
      <el-table-column label="当前剩余数量" prop="num"></el-table-column>
    </el-table>
    <pagination v-show="form.totalRow>0" :total="form.totalRow" :page.sync="form.pageNumber" :limit.sync="form.pageSize" @pagination="getList" :page-sizes="[5,10,15,20,30,50,100]" />

  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // 分页
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tableList: [], // 表格绑定的数组
      query:'',
      listLoading: false, // 表格 loading 字段
      form:{
        pageNumber:1,
        pageSize:15,
        totalRow:1
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
     queryTable() {
      console.log(this.query);
      this.http.QueryPeijian({ query: this.query }).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
      this.query = "";
    },
    getList() {
      this.listLoading = true;
      let info = {
        pageNumber: this.form.pageNumber,
        pageSize: this.form.pageSize,
      };
      this.http.QueryPeijian(info).then((res) => {
       console.log(res);
       this.tableList = res.data
        this.form.totalRow = res.total;

        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">
.close {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>