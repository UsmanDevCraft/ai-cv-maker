import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { TailoredCV } from "../../types/cv_template";

// Create high-quality, professional document styles
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#333333",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 10,
    borderBottom: "1px solid #cbd5e1",
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  subtitle: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    color: "#475569",
    fontSize: 9,
  },
  linksContainer: {
    flexDirection: "column",
    marginTop: 4,
    gap: 1,
  },
  linkText: {
    color: "#1e40af",
    fontSize: 8.5,
    textDecoration: "underline",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    marginTop: 14,
    marginBottom: 6,
    borderBottom: "1px solid #cbd5e1",
    paddingBottom: 2,
    letterSpacing: 0.5,
  },
  summary: {
    marginBottom: 6,
    textAlign: "justify",
    fontSize: 9.5,
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  company: {
    fontWeight: "bold",
    color: "#1e293b",
    fontSize: 10,
  },
  duration: {
    fontSize: 9,
    color: "#475569",
  },
  role: {
    fontStyle: "italic",
    color: "#475569",
    marginTop: 1,
    marginBottom: 3,
    fontSize: 9,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9.5,
    color: "#475569",
  },
  bulletText: {
    flex: 1,
    textAlign: "justify",
    fontSize: 9,
  },
  technologiesText: {
    fontSize: 8.5,
    color: "#475569",
    marginTop: 2,
    fontStyle: "italic",
  },
  skillsGroup: {
    marginBottom: 4,
  },
  skillsLabel: {
    fontWeight: "bold",
    color: "#1e293b",
    fontSize: 9.5,
  },
  skillsText: {
    fontSize: 9.5,
  },
});

export const CVDocument = ({ data }: { data: TailoredCV }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.full_name}</Text>
        <View style={styles.subtitle}>
          <Text>
            {data.email} | {data.phone}
          </Text>
        </View>
        {data.links && data.links.length > 0 && (
          <View style={styles.linksContainer}>
            {data.links.map((link, idx) => {
              const label = link.text || link.url || link.type;
              const href = link.url;
              return href ? (
                <Link key={idx} src={href} style={styles.linkText}>
                  {label}
                </Link>
              ) : (
                <Text key={idx} style={styles.linkText}>
                  {label}
                </Text>
              );
            })}
          </View>
        )}
      </View>

      {/* Professional Summary */}
      {data.professional_summary && (
        <View wrap={false}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.professional_summary}</Text>
        </View>
      )}

      {/* Skills Section */}
      <View wrap={false}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={{ marginBottom: 4 }}>
          {data.skills && data.skills.length > 0 && (
            <View style={styles.skillsGroup}>
              <Text style={styles.skillsText}>
                <Text style={styles.skillsLabel}>Core Skills: </Text>
                {data.skills.join(", ")}
              </Text>
            </View>
          )}
          {data.technical_skills && data.technical_skills.length > 0 && (
            <View style={styles.skillsGroup}>
              <Text style={styles.skillsText}>
                <Text style={styles.skillsLabel}>Technical Skills: </Text>
                {data.technical_skills.join(", ")}
              </Text>
            </View>
          )}
          {data.soft_skills && data.soft_skills.length > 0 && (
            <View style={styles.skillsGroup}>
              <Text style={styles.skillsText}>
                <Text style={styles.skillsLabel}>Soft Skills: </Text>
                {data.soft_skills.join(", ")}
              </Text>
            </View>
          )}
          {data.tools_and_technologies &&
            data.tools_and_technologies.length > 0 && (
              <View style={styles.skillsGroup}>
                <Text style={styles.skillsText}>
                  <Text style={styles.skillsLabel}>Tools & Technologies: </Text>
                  {data.tools_and_technologies.join(", ")}
                </Text>
              </View>
            )}
        </View>
      </View>

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.duration}>{exp.duration}</Text>
              </View>
              <Text style={styles.role}>{exp.role}</Text>
              {exp.bullet_points &&
                exp.bullet_points.map((bullet, idx) => (
                  <View key={idx} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.company}>{proj.name}</Text>
                <Text style={styles.duration}>{proj.duration || ""}</Text>
              </View>
              {proj.link ? (
                <Link src={proj.link} style={styles.linkText}>
                  {proj.link}
                </Link>
              ) : null}
              <Text style={styles.bulletText}>{proj.description}</Text>
              {proj.technologies && proj.technologies.length > 0 && (
                <Text style={styles.technologiesText}>
                  Technologies: {proj.technologies.join(", ")}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.duration}>{edu.duration}</Text>
              </View>
              <Text style={styles.role}>{edu.degree}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, index) => (
            <View key={index} style={styles.itemHeader} wrap={false}>
              <Text style={styles.company}>
                {cert.name} — <Text style={styles.role}>{cert.issuer}</Text>
              </Text>
              <Text style={styles.duration}>{cert.year || ""}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Awards & Honors</Text>
          {data.awards.map((award, index) => (
            <View key={index} style={styles.itemHeader} wrap={false}>
              <Text style={styles.company}>
                {award.title} — <Text style={styles.role}>{award.issuer}</Text>
              </Text>
              <Text style={styles.duration}>{award.year || ""}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Publications */}
      {data.publications && data.publications.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Publications</Text>
          {data.publications.map((pub, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.company}>{pub.title}</Text>
                <Text style={styles.duration}>{pub.year || ""}</Text>
              </View>
              <Text style={styles.role}>{pub.publisher}</Text>
              {pub.link ? (
                <Link src={pub.link} style={styles.linkText}>
                  {pub.link}
                </Link>
              ) : null}
            </View>
          ))}
        </View>
      )}

      {/* Volunteer Experience */}
      {data.volunteer_experience && data.volunteer_experience.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Volunteer Experience</Text>
          {data.volunteer_experience.map((vol, index) => (
            <View key={index} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.company}>{vol.organization}</Text>
                <Text style={styles.duration}>{vol.duration}</Text>
              </View>
              <Text style={styles.role}>{vol.role}</Text>
              {vol.bullet_points &&
                vol.bullet_points.map((bullet, idx) => (
                  <View key={idx} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <View wrap={false}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 4,
            }}
          >
            {data.languages.map((lang, index) => (
              <Text key={index} style={styles.bulletText}>
                <Text style={{ fontWeight: "bold" }}>{lang.language}:</Text>{" "}
                {lang.proficiency}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);
