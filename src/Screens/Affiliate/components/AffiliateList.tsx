/**
 * Hiển thị ds affiliate (k cần phân trang), và chức năng search,
 * @param {Affiliate[]} affiliates
 * @param {Function} onSearch gọi khi tìm kiếm (using debounce)
 */

import { RightMenuFriendsSvg } from "@/assets/svg/RightMenuFriendsSvg";
import { SearchSvg } from "@/assets/svg/SearchSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EDivider } from "@/components/Divider/EDivider";
import { EInput } from "@/components/Input/EInput";
import Typography from "@/components/Text/Typography";
import { NoResultView } from "@/components/View/NoResultView";
import { alignJustify, colors } from "@/styles/theme";
import { Affiliate } from "@/types/affilicate";
import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AffiliateItem } from "./AffiliateItem";

type AffiliateListProps = {
  affiliates: Affiliate[];
  onSearch: (search: string) => void;
};

export const AffiliateList = (props: AffiliateListProps) => {
  const [search, setSearch] = useState("");

  return (
    <ShadowCard style={{ marginTop: 24, flex: 1 }}>
      {/* search  */}
      <View style={{ paddingTop: 16 }}>
        <Typography
          preset="mediumParagraph"
          color="#000"
          style={{ marginHorizontal: 16 }}
        >
          Bạn bè đã sử dụng mã giới thiệu của bạn
        </Typography>
        <EInput
          placeholder="Tìm theo tên...."
          onChangeText={(text) => {
            setSearch(text);
            // props.onSearch(text);
          }}
          inputStyle={{ borderWidth: 0 }}
          componentRight={
            <TouchableOpacity onPress={() => props.onSearch(search)}>
              <SearchSvg color={colors.primary} />
            </TouchableOpacity>
          }
        />
      </View>

      <EDivider backgroundColor={colors.placeholder} />

      {/* ds affiliate */}
      <FlatList
        data={props.affiliates}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => <AffiliateItem affiliate={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={{ flex: 1, ...alignJustify() }}>
            <NoResultView
              icon={<RightMenuFriendsSvg size={48} />}
              title={
                !!search
                  ? "Không có người này trong danh sách sử dụng mã giới thiệu của bạn."
                  : "Chưa có ai sử dụng mã giới thiệu của bạn"
              }
              content={
                "Hãy share mã giới thiệu ngay cho bạn bè để nhận thêm điểm nhé!"
              }
            />
          </View>
        }
      />
    </ShadowCard>
  );
};
