import React, { useEffect, useState } from "react";
import config from "../config";
import { publicAPI } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	ToastAndroid,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/auth/auth.slice";
import jwtDecode from "jwt-decode";
import Icon from "react-native-vector-icons/AntDesign";

import Loading from "../components/Loading";
const Home = ({ navigation }) => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// const [user, setUser] = useState(null);
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleLike = async (postId) => {
		try {
			if (user) {
				await publicAPI.put(`/story/${postId}/like`, { userId: user.id });
			} else {
				ToastAndroid.show("Please login to like the post!", ToastAndroid.SHORT);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const editDate = (createdAt) => {
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const d = new Date(createdAt);
		var datestring =
			d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear();
		return datestring;
	};

	const getImg = (name) => {
		return `${config.backendURI}/storyImages/${name}`;
	};
	useEffect(() => {
		setLoading(true);
		const getStories = async () => {
			try {
				const { data } = await publicAPI.get(`/story/getAllStories`);

				setStories(data.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};
		const getUser = async () => {
			try {
				const userExist = await AsyncStorage.getItem("accessToken");
				if (userExist) {
					const userInfo = jwtDecode(userExist);
					dispatch(login(userInfo));
				}
			} catch (err) {
				console.log(err);
			}
		};
		getStories();
		getUser();
	}, [navigation]);
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<SafeAreaView style={styles.container}>
					<ScrollView
						style={styles.scrollView}
						showsHorizontalScrollIndicator={false}
					>
						{stories.length ? (
							stories.map((data) => {
								return (
									<Card
										style={styles.card}
										key={data._id}
										onPress={() =>
											navigation.navigate("PostInfo", {
												slug: data.slug,
											})
										}
									>
										<Card.Cover source={{ uri: getImg(data.image) }} />
										<Card.Title
											titleNumberOfLines={2}
											title={data.title}
											titleStyle={{
												lineHeight: 26,
												fontWeight: "bold",
												fontSize: 20,
											}}
										/>
										<Card.Content>
											<Text numberOfLines={3}>{editDate(data.createdAt)} </Text>
											<Text onPress={() => handleLike(data._id)}>
												<Icon name="like1" size={20} /> {data.likes.length}{" "}
											</Text>
										</Card.Content>
									</Card>
								);
							})
						) : (
							<Text> Chưa có bài viết nào</Text>
						)}
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	card: {
		margin: 10,
		padding: 15,
		borderColor: "gray",
	},
	scrollView: {
		marginHorizontal: 20,
	},
	text: {
		fontSize: 42,
	},
	content: {
		flex: 1,
	},
});
export default Home;
