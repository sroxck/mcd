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
             <el-form-item label-width="70px" style="margin-right:20px;" >
            <el-dropdown class="columnStyle" size="small">
               <el-button>
                    选择列
                    <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-checkbox v-model="showShuoMing" size="small" class="columnCheckbox">维修说明</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="showBianHao" size="small" class="columnCheckbox">餐厅编号</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="showTime" size="small" class="columnCheckbox">日期</el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-button style @click="dialogFormVisible = true">新增</el-button>
          <el-button style @click="getList()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增的弹框 -->
    <el-dialog title="新增记录" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="form" :inline="true" label-position="left">
        <el-divider>基础信息</el-divider>
        <el-row>
          <el-form-item label="日期" class="mr-3" label-width="70px">
             <el-date-picker
              v-model="form.time"
              type="date"
               style="width:140px; margin-right:15px;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="餐厅编号" class="mr-3" label-width="70px">
            <el-input v-model="form.diningNum" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="餐厅名称" class="mr-3" label-width="70px">
            <el-input v-model="form.diningName" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="EPS号" class="mr-3" label-width="70px">
            <el-input v-model="form.eps" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="次数" class="mr-3" label-width="70px">
            <el-input v-model="form.number" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="维修单号" class="mr-3" label-width="70px">
            <el-input v-model="form.fixOrder" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="维修人员" class="mr-3" label-width="70px">
            <el-input v-model="form.fixPeople" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="人数" class="mr-3" label-width="70px">
            <el-input v-model="form.peopleCount" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
          <el-form-item label="维修说明" class="mr-3" label-width="70px">
            <el-input v-model="form.bz" autocomplete="off" style="width:140px; margin-right:15px;"></el-input>
          </el-form-item>
        </el-row>

        <el-divider>配件信息</el-divider>
        <el-row class="mb-2">
          <el-button class="el-icon-plus  mb-2" @click="form.data.push({})" type="primary"  circle></el-button>
          <div v-for="(item,index) in form.data" :key="index">
            <el-form-item label="配件名称" class="mr-3" label-width="70px">
              <el-select
                v-model="item.accessories"
                filterable
                style="width:140px; margin-right:15px;"
                placeholder="请选择"
                @change="accessoriesChange(index,item)"
              >
                <el-option v-for="k in accessories" :key="k._id" :label="k.name" :value="k.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配件数量" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="item.accessoriesShuLiang" @blur="peijianSum(item,index)"></el-input>
            </el-form-item>
            <el-form-item label="配件价格" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="item.price"></el-input>
            </el-form-item>
              <el-button class="el-icon-delete  mb-2" @click="form.data.splice(index,1)" type="danger"  circle></el-button>
          </div>
        </el-row>

        <el-divider>统计信息</el-divider>
          <el-button class="mb-2" @click="sunAdnsub" type="primary" size="mini" round>计算结果</el-button>
          <el-row>
            <el-form-item label="配件合计" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="form.accessoriesSum"></el-input>
            </el-form-item>
            <el-form-item label="人均配件" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model="form.average"></el-input>
            </el-form-item>
            <el-form-item label="人工费" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="form.artificial"></el-input>
            </el-form-item>
            <el-form-item label="人均人工" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="form.averagePrice"></el-input>
            </el-form-item>
            <el-form-item label="车费" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="form.fare"></el-input>
            </el-form-item>
            <el-form-item label="总计" class="mr-3" label-width="70px">
              <el-input style="width:140px; margin-right:15px;" autocomplete="off" v-model.number="form.sumTotal"></el-input>
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
      stripe
      highlight-current-row
    >
      <el-table-column label="日期" prop="time" v-if="showTime"></el-table-column>
      <el-table-column label="餐厅编号" prop="diningNum" v-if="showBianHao"></el-table-column>
      <el-table-column label="餐厅名称" prop="diningName"></el-table-column>
      <el-table-column label="EPS号" prop="eps"></el-table-column>
      <el-table-column label="维修单号" prop="fixOrder"></el-table-column>
      <el-table-column label="维修人员" prop="fixPeople"></el-table-column>
      <el-table-column label="人数" prop="peopleCount"></el-table-column>
      <el-table-column label="维修说明" prop="bz" v-if="showShuoMing"></el-table-column>
      <el-table-column label="配件合计" prop="accessoriesSum"></el-table-column>
      <el-table-column label="人工" prop="artificial"></el-table-column>
      <el-table-column label="车费" prop="fare"></el-table-column>
      <el-table-column label="总计" prop="sumTotal"></el-table-column>
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
          <el-input v-model="dataop.name" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="配件数量" label-width="100px">
          <el-input v-model="dataop.num" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="配件厂商" label-width="100px">
          <el-input v-model="dataop.vendor" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="配件编号" label-width="100px">
          <el-input v-model="dataop.prnum" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="配件进价" label-width="100px">
          <el-input v-model="dataop.price" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="配件单价" label-width="100px">
          <el-input v-model="dataop.oneprice" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="分组" label-width="100px">
          <el-input v-model="dataop.grop" autocomplete="off" style="width:140px;"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input v-model="dataop.bz" autocomplete="off" style="width:140px;"></el-input>
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
      queryInfo: {},
      query: "",
      tableList: [],
      listLoading: false,
      dialogFormVisible: false,
      drawer: false,
      showShuoMing:false,
      showBianHao:false,
      showTime:false,
      accessories: [], // 配件名称列表
      form: {
        data: [{},],
        time: "",             // 时间
        diningNum: "",        // 餐厅编号
        diningName: "",       // 餐厅名称
        eps: "",              // eps 号
        number: "",           // 次数
        fixOrder: "",         // 维修单号
        fixPeople: "",        // 维修人员
        peopleCount: "",      // 人数
        accessoriesSum: "",   //  配件合计
        average: "",          //  人均配件
        artificial: "100",    //  人工费
        fare: "40",           //   车费
        pageNumber: 1,
        pageSize: 10,
        totalRow: 100,
        sumTotal: "",          // 总计
        averagePrice: "",      //   人均人工
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
    this.getAccessories(); //获取配件名称列表
  },
  methods: {
    peijianSum(item,index) { // 配件数量输入框,失去焦点计算当前行的总价
      this.$set(this.form.data[index], 'price',Number(localStorage.getItem(`${item.accessories}`)) ); // 先恢复数量 1 的单价
      let sum = this.form.data[index].accessoriesShuLiang *this.form.data[index].price // 计算输入的数量 *单价 得到总价
      this.$set(this.form.data[index], 'price', sum); // 设置总价
    },
    sunAdnsub() { // 点击计算结果按钮 进行计算

      let sum = 0;
      let priceSum = 0;
      this.form.data.forEach((k) => {
        console.log(k, "accessoriesShuLiang");
        priceSum+= Number(k.price);
        sum += Number(k.accessoriesShuLiang);
      });
      this.form.accessoriesSum = priceSum // 配件合计金额
      this.$set(this.form, "average", sum / Number(this.form.peopleCount)); // 人均配件

      this.form.averagePrice = this.form.artificial / this.form.peopleCount; // 人均人工
      this.form.sumTotal = Number(this.form.accessoriesSum) + Number(this.form.artificial) + Number(this.form.fare); // 总计

    },

    getAccessories() {
      // 查询所有配件名称
      this.http.QueryPeijian({}).then((res) => {
        this.accessories = res.data;
      });
    },
    accessoriesChange(index, item, k) {
      //自动带入配件单价,合计价格
      let info = [];
      this.$set(this.form.data, index, info[0]);
      this.accessories.forEach((i,index) => {
        if (i.name == item.accessories) {
          console.log(i,item,'0909')
          info.push({ price: i.price, accessories: item.accessories ,accessoriesShuLiang:1});
          localStorage.setItem(`${item.accessories}`,i.price)
        }
      });
      this.$set(this.form.data, index, info[0]);
      // this.form.accessoriesSum = 0;
      // this.form.data.forEach((k) => {
      //   if (k.price != undefined && k.price != null) {
      //     this.form.accessoriesSum += Number(k.price);
      //   }
      // });
    },

    queryTable() {
      console.log(this.query);
      this.http.QueryOrder({ query: this.query }).then((res) => {
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
      this.http.addOrder(this.form).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("新增成功");
          this.form.data = [{}];
        } else {
          this.$notify.success("新增失败,请联系管理员");
        }
      });
      console.log(this.form, "pp4");
    },
    getList() {
      this.listLoading = true;
      let info = {
        pageNumber: this.form.pageNumber,
        pageSize: this.form.pageSize,
      };
      this.http.QueryOrder(info).then((res) => {
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

</style>