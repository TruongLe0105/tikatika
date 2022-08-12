import { foodOrderApi } from "@/api/foodOrder.api";
import { storeApi } from "@/api/store.api";

import { Alert } from "@/components/Alert/Alert";
import { IAddress } from "@/types/address";
import { Food, FoodOrder, FoodShop, OrderFoodStatus } from "@/types/food-order";
import { PaymentType } from "@/types/payment";
import { Promotion } from "@/types/promotion";
import { EventRegister } from "react-native-event-listeners";
import { EventRegisterType } from "@/types/screen";
import { isEmpty } from "lodash";
import { action, computed, makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import moment from "moment";
import { AsyncStorage } from "react-native";
import { IDirection, locationStore } from "./locationStore";


class FoodOrderStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: "FoodOrderStore",
            properties: ["lastOrder", 'cart'],
            storage: AsyncStorage,
        });
    }

    order: Partial<FoodOrder> = {
        details: [],
        paymentType: PaymentType.Cash
    }
    district = ''
    city = ''
    resultEst: Partial<FoodOrder> = {}
    direction: IDirection = null
    selected: Partial<FoodOrder> = {}
    lastOrder: Partial<FoodOrder> = {}
    selectedShop: FoodShop = {}
    cart: Food[] = []
    promotion: Promotion
    list: FoodOrder[] = []
    query = {
        page: 1, limit: 10,
        from: moment().subtract(7, "days").format('DD/MM/YYYY'),
        to: moment().format('DD/MM/YYYY'),
    }
    isRefreshing = false
    totalItems = 0
    isFetchMore = false

    @action
    fetchFavoriteStore = async () => {
        try {
            const res = await storeApi.findAllFavorite({});
        } finally {

        }
    }

    @action
    favoriteShop = async (foodShop: FoodShop = this.selectedShop) => {

        try {
            if (!foodShop.isFavorite) {
                foodShop.isFavorite = true
                storeApi.favorite(foodShop.id);

            } else {
                foodShop.isFavorite = false
                storeApi.unFavorite(foodShop.id);

            }

            EventRegister.emit(EventRegisterType.LikedShop, foodShop);
        } finally {
        }
    }

    @action
    fetchDetailShop = async (id = this.selectedShop.id) => {
        const res = await storeApi.findOne(id);
        this.selectedShop = res.data
    };

    @action
    fetchList = async (isRefreshing = true) => {
        try {
            this.query.page = 1
            this.isRefreshing = isRefreshing
            const query = {
                ...this.query,
                from: moment(this.query.from, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                to: moment(this.query.to, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            }
            const res = await foodOrderApi.findAll(query)
            console.log('fetch list food order', res.data);

            this.list = res.data.orders
            this.totalItems = res.data.total
        } finally {
            this.isRefreshing = false
        }
    }

    @action
    fetchMoreList = async () => {
        try {
            if (this.list.length < this.totalItems) {
                this.query.page++
                this.isFetchMore = true
                const query = {
                    ...this.query,
                    from: moment(this.query.from, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                    to: moment(this.query.to, 'DD/MM/YYYY').format('YYYY-MM-DD'),
                }
                const res = await foodOrderApi.findAll(query)
                this.list = [...this.list, ...res.data.orders]
            }
        } finally {
            this.isFetchMore = false
        }
    }

    @action
    setPromotion(promotion: Promotion) {
        this.promotion = promotion
    }

    @computed
    checkCartEmpty() {
        for (const item of this.cart) {
            if (item.quantity > 0) {
                return false
            }

        }
        return true
    }

    @computed
    get totalFoodInCart() {
        const count = this.cart.reduce((prev, cur) => prev + cur.quantity, 0)
        return count
    }

    @computed
    get totalMoneyInCart() {
        const res = this.cart.reduce((prev, cur) => prev + (cur.quantity * cur.finalPrice), 0)
        return res
    }

    @action
    resetOrder() {
        // this.order = {
        //     details: [],
        //     paymentType: PaymentType.Cash,
        //     isUseBalancePromotion: false
        // }
        this.order.details = []
        this.order.paymentType = PaymentType.Cash
        this.order.isUseBalancePromotion = false
        this.order.note = ''
    }

    @action
    setPaymentType = (val: PaymentType) => {
        this.order.paymentType = val
    }

    @action
    setUsingPoint = (isUseBalancePromotion) => {
        this.order.isUseBalancePromotion = isUseBalancePromotion
    }

    @action
    resetCart() {
        this.cart = []
    }

    @action
    setSelectedShop(shop: FoodShop) {


        this.selectedShop = { ...this.selectedShop, ...shop }
    }

    @action
    setSelected(order: Partial<FoodOrder>) {
        this.selected = order
    }

    @action
    setOrder(order: Partial<FoodOrder>) {
        this.order = order
    }

    @action
    addToCart = (food: Food, quantity: number, isAdd = false) => {
        const findStore = this.cart.find(e => e.store?.id != food.store?.id)
        if (!isEmpty(findStore)) {
            setTimeout(() => {
                Alert.alert({
                    title: 'Thông báo',
                    message: 'Không thêm thức ăn cửa hàng khác vào giỏ. Bạn có muốn xóa đồ ăn trong giỏ hàng hiện tại không?',
                    buttonGroup: [{ text: 'Cancel', style: 'cancel' }, {
                        text: 'OK', onPress: () => {
                            this.cart = []
                            this.cart.push({
                                ...food,
                                quantity
                            })
                        }
                    }]
                })
            }, 500);

            return null
        }
        const findIndex = this.cart.findIndex(e => e.id == food.id)
        if (findIndex > -1) {
            const item = this.cart[findIndex]
            item.quantity += quantity
            if (!isAdd) {
                item.quantity = quantity
            }
            if (quantity == 0) {
                this.cart.splice(findIndex, 1)
            }
        } else {
            this.cart.push({
                ...food,
                quantity
            })
        }
        console.log('addToCart', toJS(this.cart));

    }

    @action
    setEndAddressOrder(address: IAddress) {
        console.log('setEndAddressOrder', address);

        this.order.endAddress = address.formattedAddress;
        this.order.endName = address.route;
        this.order.endLat = address.latitude;
        this.order.endLong = address.longitude;
        this.district = address.district;
        this.city = address.city;
    }

    @action
    setLastOrder(order: Partial<FoodOrder>) {
        this.lastOrder = order
    }

    @action
    getLastOrder = async () => {
        const statusExclude = [OrderFoodStatus.Complete, OrderFoodStatus.CustomerCancel, OrderFoodStatus.DriverCancel]
        const res = await foodOrderApi.lastOrder()
        if (!isEmpty(res.data) && !statusExclude.includes(res.data.status)) {
            this.lastOrder = res.data

            // OrderEntity.add(res.data.id, OrderType.Delivery, res.data.status)
        } else {
            this.lastOrder = {}
        }
        console.log('getLastOrder food', toJS(this.lastOrder));
    }



    @action
    create = async () => {
        const order = { ...this.order }
        const details = this.cart.map(e => ({
            productId: e.id,
            quantity: e.quantity
        }))
        const data = {
            order: {
                ...order,
                ...this.direction,
                startLat: this.selectedShop.lat,
                startLong: this.selectedShop.long,
                startName: this.selectedShop.address,
                startAddress: this.selectedShop.address,
            },
            couponId: this.promotion?.id,
            details,
            storeId: this.selectedShop.id
        }
        console.log('data create', toJS(data));

        const res = await foodOrderApi.create(data)

        console.log('create ne', JSON.stringify(res.data));
        this.selected = res.data.order
        this.lastOrder = res.data.order
        return res
    }

    @action
    cancelSelected = async () => {
        const res = await foodOrderApi.cancel(this.selected.id)
        console.log('cancel ne', res.data);
        this.selected.status = res.data.status
    }

    @action
    fetchSelected = async () => {
        const res = await foodOrderApi.findOne(this.selected.id)
        this.selected = res.data
        return res.data
    }

    @action
    fetchDirection = async () => {
        console.log('this.selectedShop.lat', this.selectedShop.lat, this.selectedShop.long);
        console.log('this.order', this.order.endLat, this.order.endLong);
        const direction = await locationStore.fetchDirection({
            latitude: this.selectedShop.lat,
            longitude: this.selectedShop.long,
        }, {
            latitude: this.order.endLat,
            longitude: this.order.endLong,
        })


        this.direction = direction
    }

    @action
    estimate = async () => {

        const direction = this.direction
        const details = this.cart.map(e => ({
            productId: e.id,
            quantity: e.quantity
        }))
        console.log('district,', this.district);
        const order = { ...this.order }
        const data = {
            order: {
                ...order,
                ...this.direction,
                startLat: this.selectedShop.lat,
                startLong: this.selectedShop.long,
                startName: this.selectedShop.address,
                startAddress: this.selectedShop.address,
            },
            details,
            storeId: this.selectedShop?.id,
            couponId: this.promotion?.id
        }
        console.log('data estOrder', JSON.stringify(data));


        const res = await foodOrderApi.est(data)
        this.resultEst = res.data
        if (this.resultEst.moneyDiscount == 0 && this.promotion
            //  && promotionStore.selected
        ) {
            Alert.alert({
                title: 'Thông báo',
                message: 'Không thể áp dụng mã khuyến mãi này'
            });
            this.promotion = null
        }
        console.log('result ne', JSON.stringify(res.data));

    }
}


const foodOrderStore = new FoodOrderStore


export { foodOrderStore }


