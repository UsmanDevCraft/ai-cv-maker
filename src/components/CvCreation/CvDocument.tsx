import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { TailoredCV } from "../../types/cv_template";

// Create high-quality, professional document styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333333",
    lineSpacing: 1.2,
  },
  header: {
    marginBottom: 15,
    borderBottom: "1px solid #cccccc",
    paddingBottom: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111111",
    textTransform: "uppercase",
  },
  subtitle: { flexDirection: "row", gap: 10, marginTop: 4, color: "#666666" },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    marginTop: 15,
    marginBottom: 5,
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: 2,
  },
  summary: { marginBottom: 10, textAlign: "justify" },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: 6,
  },
  company: { fontWeight: "bold", color: "#1e293b" },
  role: { fontStyle: "italic", color: "#475569", marginTop: 2 },
  bullet: { flexDirection: "row", marginBottom: 3, paddingLeft: 10 },
  bulletPoint: { width: 6, fontSize: 10 },
  bulletText: { flex: 1, textAlign: "justify" },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
});

export const CVDocument = ({ data }: { data: TailoredCV }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.full_name}</Text>
        <View style={styles.subtitle}>
          <Text>{data.email} | </Text>
          <Text>{data.phone}</Text>
          {data.links?.map((link, idx) => (
            <Text key={idx}> | {link}</Text>
          ))}
        </View>
      </View>

      {/* Professional Summary */}
      <Text style={styles.sectionTitle}>Professional Summary</Text>
      <Text style={styles.summary}>{data.professional_summary}</Text>

      {/* Skills Section */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <Text style={styles.summary}>{data.skills.join(", ")}</Text>

      {/* Work Experience */}
      <Text style={styles.sectionTitle}>Experience</Text>
      {data.experience.map((exp, index) => (
        <View key={index} style={{ marginBottom: 8 }}>
          <View style={styles.itemHeader}>
            <Text style={styles.company}>{exp.company}</Text>
            <Text>{exp.duration}</Text>
          </View>
          <Text style={styles.role}>{exp.role}</Text>
          {exp.bullet_points.map((bullet, idx) => (
            <View key={idx} style={styles.bullet}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* Education */}
      <Text style={styles.sectionTitle}>Education</Text>
      {data.education.map((edu, index) => (
        <View key={index} style={styles.itemHeader}>
          <Text style={{ fontWeight: "bold" }}>
            {styles.company && edu.institution} ({edu.degree})
          </Text>
          <Text>{edu.duration}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
