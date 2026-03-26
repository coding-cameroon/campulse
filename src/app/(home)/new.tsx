import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import {
  Calendar,
  Camera,
  ChevronDown,
  ChevronUp,
  Ghost,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Search,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const POST_TYPES = [
  { id: "announcement", label: "Announcement", icon: Megaphone },
  { id: "lost_found", label: "Lost & Found", icon: Search },
  { id: "events", label: "Campus Event", icon: Calendar },
  { id: "anonymous_feed", label: "Anonymous Feed", icon: Ghost },
];

const CreatePostScreen = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [postType, setPostType] = useState("anonymous_feed");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    contact: "",
    locationName: "",
    eventDate: "",
    source: "",
    coords: { lat: null, long: null },
  });

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelectType = (id: string) => {
    setPostType(id);
    setIsExpanded(false);
  };

  const handlePost = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const renderMediaActions = (allowCamera: boolean) => (
    <View style={styles.mediaRow}>
      <TouchableOpacity style={styles.mediaButton} activeOpacity={0.8}>
        <ImageIcon color={COLORS.light} size={20} />
        <Text style={styles.mediaText}>Gallery</Text>
      </TouchableOpacity>
      {allowCamera && (
        <TouchableOpacity style={styles.mediaButton} activeOpacity={0.8}>
          <Camera color={COLORS.light} size={20} />
          <Text style={styles.mediaText}>Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* --- TOP HEADER WITH PROFILE --- */}
          <View style={styles.topRow}>
            <Text style={styles.mainHeader}>New Post</Text>
            <TouchableOpacity style={styles.profileCircle} activeOpacity={0.7}>
              <User color="white" size={24} />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>
              Posting as{" "}
              <Text style={{ color: COLORS.accent, fontWeight: "800" }}>
                Shinny Squirrel
              </Text>
            </Text>
          </View>

          {/* --- COLLAPSIBLE SELECTOR --- */}
          <View style={styles.accordionContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.accordionHeader}
              onPress={toggleAccordion}
            >
              <View style={styles.headerLeft}>
                <Text style={styles.labelTitle}>POST TYPE</Text>
                <Text style={styles.selectedTypeText}>
                  {POST_TYPES.find((t) => t.id === postType)?.label}
                </Text>
              </View>
              {isExpanded ? (
                <ChevronUp color={COLORS.gray} />
              ) : (
                <ChevronDown color={COLORS.gray} />
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.optionsGrid}>
                {POST_TYPES.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.optionCard,
                      postType === item.id && styles.activeOption,
                    ]}
                    onPress={() => handleSelectType(item.id)}
                  >
                    <item.icon
                      color={postType === item.id ? "black" : COLORS.light}
                      size={22}
                    />
                    <Text
                      style={[
                        styles.optionLabel,
                        postType === item.id && { color: "black" },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* --- DYNAMIC FIELDS --- */}
          <View style={styles.formContainer}>
            <InputField
              label="Title"
              placeholder="What's happening?"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />

            <InputField
              label="Description"
              placeholder="Provide more details..."
              multiline
              numberOfLines={4}
              style={styles.textArea}
              value={form.desc}
              onChangeText={(v) => setForm({ ...form, desc: v })}
            />

            {/* ANNOUNCEMENT SPECIFIC */}
            {postType === "announcement" && (
              <InputField
                label="Source"
                placeholder="e.g. Student Union, Registrar's Office"
                value={form.source}
                onChangeText={(v) => setForm({ ...form, source: v })}
              />
            )}

            {postType === "lost_found" && (
              <>
                <InputField
                  label="Contact Details"
                  placeholder="Phone or Social handle"
                  value={form.contact}
                  onChangeText={(v) => setForm({ ...form, contact: v })}
                />
                <InputField
                  label="Last Seen Location"
                  placeholder="e.g. Faculty of Science"
                  value={form.locationName}
                  onChangeText={(v) => setForm({ ...form, locationName: v })}
                />
                {renderMediaActions(true)}
              </>
            )}

            {postType === "events" && (
              <>
                <InputField
                  label="Event Date & Time"
                  placeholder="e.g. Friday, 24th March at 2 PM"
                  value={form.eventDate}
                  onChangeText={(v) => setForm({ ...form, eventDate: v })}
                />
                <InputField
                  label="Venue / Venue Name"
                  placeholder="e.g. Main Auditorium"
                  value={form.locationName}
                  onChangeText={(v) => setForm({ ...form, locationName: v })}
                />
                <View style={styles.eventLocationBox}>
                  <Text style={styles.innerLabel}>
                    LOCATION COORDINATES (GPS)
                  </Text>
                  <TouchableOpacity
                    style={styles.mapTrigger}
                    activeOpacity={0.8}
                  >
                    <MapPin color={COLORS.gray} size={20} />
                    <Text style={styles.mapTriggerText}>
                      {form.coords.lat
                        ? `${form.coords.lat}, ${form.coords.long}`
                        : "Open Map to set location"}
                    </Text>
                  </TouchableOpacity>
                  <Button style={styles.locationButton}>
                    <Text style={styles.locationButtonText}>
                      Use Current Location
                    </Text>
                  </Button>
                </View>
                {renderMediaActions(false)}
              </>
            )}

            {(postType === "announcement" || postType === "anonymous_feed") &&
              renderMediaActions(false)}

            <Button
              loading={loading}
              onPress={handlePost}
              style={styles.postButton}
            >
              <Text style={styles.buttonText}>Publish Post</Text>
            </Button>
          </View>

          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  scrollContent: { paddingHorizontal: 18, paddingTop: 10 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
  },
  mainHeader: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  accordionContainer: {
    backgroundColor: "#121212",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#222",
    overflow: "hidden",
    marginBottom: 24,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: { gap: 4 },
  labelTitle: {
    color: COLORS.gray,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  selectedTypeText: { color: COLORS.light, fontSize: 18, fontWeight: "700" },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  optionCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  activeOption: { backgroundColor: COLORS.light },
  optionLabel: { color: COLORS.light, fontSize: 12, fontWeight: "600" },
  formContainer: { gap: 4 },
  textArea: { height: 100, textAlignVertical: "top", paddingTop: 12 },
  mediaRow: { flexDirection: "row", gap: 12, marginBottom: 24, marginTop: 10 },
  mediaButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  mediaText: { color: COLORS.light, fontWeight: "600" },
  eventLocationBox: {
    backgroundColor: "#121212",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginVertical: 12,
  },
  innerLabel: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
  },
  mapTrigger: {
    height: 56,
    backgroundColor: "#000",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  mapTriggerText: { color: COLORS.gray, fontSize: 14 },
  locationButton: { marginTop: 12, backgroundColor: "#1A1A1A" },
  locationButtonText: { color: COLORS.light, fontWeight: "600" },
  postButton: { marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: "700", color: "black" },
});

export default CreatePostScreen;
