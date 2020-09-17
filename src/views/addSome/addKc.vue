<template>
  <div class="app-container">
    <el-row>
       <el-input placeholder="请输入配件名称,按回车查询" prefix-icon="el-icon-search" v-model="query" @change="queryTable" style="width:280px;">
  </el-input>
    <el-button style="" @click="dialogFormVisible = true">新增配件</el-button>
    <el-button style="" @click="getList()">重置</el-button>
    </el-row>
    <el-row>
    </el-row>
    <el-dialog title="新增配件" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-button @click="form.data.push({})">新增一行</el-button>
        <el-row v-for="(item,index) in form.data" :key="index">
          <el-form-item label="配件名称" :label-width="formLabelWidth">
            <el-input v-model="item.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="配件数量" :label-width="formLabelWidth">
            <el-input v-model="item.num" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="配件厂商" :label-width="formLabelWidth">
            <el-input v-model="item.vendor" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="配件进价" :label-width="formLabelWidth">
            <el-input v-model="item.price" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="配件单价" :label-width="formLabelWidth">
            <el-input v-model="item.oneprice" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="产品编号" :label-width="formLabelWidth">
            <el-input v-model="item.prnum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分组" :label-width="formLabelWidth">
            <el-input v-model="item.grop" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="item.bz" autocomplete="off"></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </div>
    </el-dialog>

    

    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="100px" ></el-table-column>
      <el-table-column label="配件名称" prop="name"></el-table-column>
      <!-- <el-table-column label="配件数量" prop="num"></el-table-column> -->
      <el-table-column label="配件厂商" prop="vendor"></el-table-column>
      <el-table-column label="配件编号" prop="prnum"></el-table-column>
      <el-table-column label="配件进价" prop="price"></el-table-column>
      <el-table-column label="配件单价" prop="oneprice"></el-table-column>
      <el-table-column label="备注" prop="bz"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="编辑配件信息" :visible.sync="drawer" :with-header="false" class="tk">
      <el-form :model="dataop" style="margin-top:50px;">
        <el-form-item label="配件名称" label-width="100px">
          <el-input v-model="dataop.name" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件数量" label-width="100px">
          <el-input v-model="dataop.num" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件厂商" label-width="100px">
          <el-input v-model="dataop.vendor" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件编号" label-width="100px">
          <el-input v-model="dataop.prnum" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件进价" label-width="100px">
          <el-input v-model="dataop.price" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="配件单价" label-width="100px">
          <el-input v-model="dataop.oneprice" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
        <el-form-item label="分组" label-width="100px">
          <el-input v-model="dataop.grop" autocomplete="off" style="width:280px;"></el-input>
        </el-form-item>
         <el-form-item label="备注" label-width="100px">
          <el-input v-model="dataop.bz" autocomplete="off" style="width:280px;"></el-input>
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
import Pagination from '@/components/Pagination' // 分页

export default {
  components: {
    Pagination
  },
  data() {
    return {
      grop:{
        data:[{}]
      },
      query:'',
      tableList: [],
      listLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      drawer: false,
      form: {
        data: [{}],
        pageNumber:1,
        pageSize:10,
        totalRow:100
      },
      dataop: {
        name: "",
        num: "",
        id: "",
        oneprice:'',
        price:'',
        prnum:'',
        vendor:'',
        grop:'',
        bz:'',
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    queryTable(){
      console.log(this.query)
      this.http.QueryPeijian({query:this.query}).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total
      });
      this.query = ''
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
        pageNumber:this.form.pageNumber,
        pageSize:this.form.pageSize
      }
      this.http.QueryPeijian(info).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total
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