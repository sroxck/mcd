<template>
  <div class="app-container">
    <!-- 查询表单-上面的查询选项 -->
    <el-form :inline="true" label-position="left">
      <el-row>
        <el-col>
          <el-form-item label="EPS编号" label-width="70px" style="margin-right:20px;">
            <el-input placeholder="请输入EPS编号" style="width:180px;" v-model="queryInfo.eps"></el-input>
          </el-form-item>
          <el-form-item label="餐厅编号" label-width="70px" style="margin-right:20px;">
            <el-input placeholder="请输入餐厅编号" style="width:180px;" v-model="queryInfo.diningNum"></el-input>
          </el-form-item>
          <el-form-item label="餐厅名称" label-width="70px" style="margin-right:20px;">
            <el-input placeholder="请输入餐厅名称" style="width:180px;" v-model="queryInfo.diningName"></el-input>
          </el-form-item>
          <el-form-item label="维修人员" label-width="70px" style="margin-right:20px;">
            <el-input placeholder="请输入维修人员" style="width:180px;" v-model="queryInfo.fixPeople"></el-input>
          </el-form-item>
          <el-form-item label-width="70px" style="margin-right:20px;" label="订单金额">
            <el-select placeholder="请选择" style="width:180px;" v-model="queryInfo.amount">
              <el-option label="一万以下" value="0-10000"></el-option>
              <el-option label="一万以上" value="10000-100000000"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="70px" style="margin-right:20px;" label="日期范围">
            <el-date-picker
              style="width:180px;"
              type="daterange"
              v-model="queryInfo.time"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-button style @click="dialogFormVisible = true">新增</el-button>
          <el-button style @click="getList()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 新增的弹框 -->
    <el-dialog title="新增记录" :visible.sync="dialogFormVisible" width="70%">
      <el-form :model="form" :inline="true" label-position="left">
        <el-divider>基础信息</el-divider>
        <el-row >
          <el-form-item label="日期" class="mr-3" label-width="70px">
            <el-input v-model="form.time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐厅编号" class="mr-3" label-width="70px">
            <el-input v-model="form.diningNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐厅名称" class="mr-3" label-width="70px">
            <el-input v-model="form.diningName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="EPS号" class="mr-3" label-width="70px">
            <el-input v-model="form.eps" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="次数" class="mr-3" label-width="70px">
            <el-input v-model="form.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="维修单号" class="mr-3" label-width="70px">
            <el-input v-model="form.fixOrder" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="维修人员" class="mr-3" label-width="70px">
            <el-input v-model="form.fixPeople" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="人数" class="mr-3" label-width="70px">
            <el-input v-model="form.peopleCount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="维修说明" class="mr-3" label-width="70px">
            <el-input v-model="form.bz" autocomplete="off"></el-input>
          </el-form-item>
        </el-row>
        <el-divider>配件</el-divider>
        <el-row class="mb-3">
          <el-button class="w-100 mb-3" @click="form.data.push({})">增加一行</el-button>
          <div v-for="(item,index) in form.data" :key="index">
            <el-form-item label="配件名称" class="mr-3" label-width="70px">
             <el-select v-model="item.accessories" filterable placeholder="请选择">
              <el-option
                v-for="k in accessories"
                :key="k._id"
                :label="k.name"
                :value="k.name">
              </el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="配件数量" class="mr-3" label-width="70px">
              <el-input autocomplete="off" v-model="item.bz"></el-input>
            </el-form-item>
            <el-form-item label="配件价格" class="mr-3" label-width="70px">
              <el-input autocomplete="off" v-model="item.bz"></el-input>
            </el-form-item>
          </div>
        </el-row>
        <el-divider>统计</el-divider>
        <el-row>
          <el-form-item label="配件合计" class="mr-3" label-width="70px">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="人均配件" class="mr-3" label-width="70px">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="人工费" class="mr-3" label-width="70px">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="人均人工" class="mr-3" label-width="70px">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车费" class="mr-3" label-width="70px">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="总计" class="mr-3" label-width="70px">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展示的表格 -->
    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="日期" prop="name"></el-table-column>
      <el-table-column label="餐厅编号" prop="vendor"></el-table-column>
      <el-table-column label="餐厅名称" prop="prnum"></el-table-column>
      <el-table-column label="EPS号" prop="price"></el-table-column>
      <el-table-column label="维修单号" prop="oneprice"></el-table-column>
      <el-table-column label="维修人员" prop="bz"></el-table-column>
      <el-table-column label="人数" prop="bz"></el-table-column>
      <el-table-column label="维修说明" prop="bz"></el-table-column>
      <el-table-column label="配件合计" prop="bz"></el-table-column>
      <el-table-column label="人工" prop="bz"></el-table-column>
      <el-table-column label="车费" prop="bz"></el-table-column>
      <el-table-column label="配件总计" prop="bz"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="remove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改的抽屉 -->
    <el-drawer title="编辑配件信息" :visible.sync="drawer" :with-header="false" class="tk">
      <el-form :model="dataop" :inline="true" label-position="left" style="margin-top:50px;">
        <el-form-item label="配件名称" label-width="100px">
          <el-input v-model="dataop.name" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="配件数量" label-width="100px">
          <el-input v-model="dataop.num" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="配件厂商" label-width="100px">
          <el-input v-model="dataop.vendor" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="配件编号" label-width="100px">
          <el-input v-model="dataop.prnum" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="配件进价" label-width="100px">
          <el-input v-model="dataop.price" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="配件单价" label-width="100px">
          <el-input v-model="dataop.oneprice" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="分组" label-width="100px">
          <el-input v-model="dataop.grop" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input v-model="dataop.bz" autocomplete="off" style="width:120px;"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer close">
        <el-button @click="editData">确 定</el-button>
        <el-button @click="drawer = false">取 消</el-button>
      </div>
    </el-drawer>

    <pagination
      v-show="form.totalRow>0"
      :total="form.totalRow"
      :page.sync="form.pageNumber"
      :limit.sync="form.pageSize"
      @pagination="getList"
    />
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
      queryInfo:{},
      query: "",
      tableList: [],
      listLoading: false,
      dialogFormVisible: false,
      drawer: false,
      accessories:[], // 配件名称列表
      form: {
        data: [{}],
        pageNumber: 1,
        pageSize: 10,
        totalRow: 100,
      },
      dataop: {
        name: "",
        num: "",
        id: "",
        oneprice: "",
        price: "",
        prnum: "",
        vendor: "",
        grop: "",
        bz: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getList();
    this.getAccessories() //获取配件名称列表
  },
  methods: {
    getAccessories(){
      this.http.QueryPeijian({}).then((res) => {
        console.log(res,'333')
        this.accessories = res.data
      });
    },
    queryTable() {
      console.log(this.query);
      this.http.QueryPeijian({ query: this.query }).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
      this.query = "";
    },
    remove(id) {
      this.http.removePeiJian({ id }).then((res) => {
        if (res.code == 200) {
          this.$notify.success("删除成功");
          this.getList();
        }
      });
    },
    editData() {
      this.http.modifyPeiJian(this.dataop).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("修改成功");
          this.drawer = false;
        }
      });
    },
    edit(row) {
      console.log(row);
      this.drawer = true;
      this.dataop.name = row.name;
      this.dataop.num = row.num;
      this.dataop.id = row._id;
      this.dataop.grop = row.grop;
      this.dataop.bz = row.bz;
      this.dataop.prnum = row.prnum;
      this.dataop.price = row.price;
      this.dataop.oneprice = row.oneprice;
      this.dataop.vendor = row.vendor;
    },
    addItem() {
      this.dialogFormVisible = false;
      this.http.addPeijian(this.form).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("新增成功");
          this.form.data = [{}];
        } else {
          this.$notify.success("新增失败,请联系管理员");
        }
      });
    },
    getList() {
      this.listLoading = true;
      let info = {
        pageNumber: this.form.pageNumber,
        pageSize: this.form.pageSize,
      };
      this.http.QueryPeijian(info).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
    },
  },
};
</script>
<style lang="scss">
.close {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
// .el-form-item {
//   margin-bottom:0 !important;
// }
</style>