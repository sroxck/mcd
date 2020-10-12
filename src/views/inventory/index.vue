<template>
  <div class="app-container">
    <!-- 展示的表格 绑定 tableList数组-->
    <el-tabs type="border-card">
      <!-- <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
        我的行程
      </el-tab-pane> -->
      <el-tab-pane label="九月">
        <el-row style="margin-bottom:20px">
          <el-input placeholder="请输入餐厅名称,按回车查询" size="small" prefix-icon="el-icon-search" v-model="query1" @change="queryTable1" style="width:280px;"></el-input>
          <el-button @click="queryTable1" size="small" style="margin-left:10px;">搜索</el-button>
          <el-button style @click="getList()" size="small">重置</el-button>
        </el-row>
        <el-table v-loading="listLoading" :data="tableList1" element-loading-text="Loading" size="small" border fit stripe>
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="配件名称" prop="name"></el-table-column>
          <el-table-column v-for="(item,index) in 31" :key="index" :label="(item)+''" width="35px" :prop="`time.jiuyue.${item}`"></el-table-column>
          <el-table-column label="剩余数量" prop="num" width="50px"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="十月">
        <el-row style="margin-bottom:20px">
          <el-input placeholder="请输入餐厅名称,按回车查询" size="small" prefix-icon="el-icon-search" v-model="query2" @change="queryTable2" style="width:280px;"></el-input>
          <el-button @click="queryTable1" size="small" style="margin-left:10px;">搜索</el-button>
          <el-button style @click="getList()" size="small">重置</el-button>
        </el-row>
        <el-table v-loading="listLoading" :data="tableList2" element-loading-text="Loading" size="small" border fit stripe>
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="配件名称" prop="name"></el-table-column>
          <el-table-column v-for="(item,index) in 31" :key="index" :label="(item)+''" width="35px" :prop="`time.shiyue.${item}`"></el-table-column>
          <el-table-column label="剩余数量" prop="num" width="50px"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="十一月">
        <el-row style="margin-bottom:20px">
          <el-input placeholder="请输入餐厅名称,按回车查询" size="small" prefix-icon="el-icon-search" v-model="query3" @change="queryTable3" style="width:280px;"></el-input>
          <el-button @click="queryTable1" size="small" style="margin-left:10px;">搜索</el-button>
          <el-button style @click="getList()" size="small">重置</el-button>
        </el-row>
        <el-table v-loading="listLoading" :data="tableList3" element-loading-text="Loading" size="small" border fit stripe>
          <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
          <el-table-column label="配件名称" prop="name"></el-table-column>
          <el-table-column v-for="(item,index) in 31" :key="index" :label="(item)+''" width="35px" :prop="`time.shiyiyue.${item}`"></el-table-column>
          <el-table-column label="剩余数量" prop="num" width="50px"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

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
      tableList1: [], // 表格绑定的数组
      tableList2: [], // 表格绑定的数组
      tableList3: [], // 表格绑定的数组
      query1: "",
      query2: "",
      query3: "",
      listLoading: false, // 表格 loading 字段
      form: {
        pageNumber: 1,
        pageSize: 15,
        totalRow: 1,
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    queryTable1() {
      this.http.QueryPeijian({ query: this.query1 }).then((res) => {
        this.tableList1 = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
      this.query = "";
    },
     queryTable2() {
      this.http.QueryPeijian({ query: this.query2 }).then((res) => {
        this.tableList2 = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
      this.query = "";
    },
     queryTable3() {
      this.http.QueryPeijian({ query: this.query3 }).then((res) => {
        this.tableList3 = res.data;
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
        
        this.tableList1 = res.data;
        
        this.tableList2 = res.data;
        this.tableList3 = res.data;
        
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