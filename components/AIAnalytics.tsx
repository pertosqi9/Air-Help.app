import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Brain, TrendingUp, Users, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface AnalyticsData {
  userSatisfaction: number;
  conflictResolution: number;
  activeUsers: number;
  potentialIssues: number;
  trends: {
    labels: string[];
    datasets: number[];
  };
}

const MOCK_DATA: AnalyticsData = {
  userSatisfaction: 92,
  conflictResolution: 88,
  activeUsers: 15234,
  potentialIssues: 23,
  trends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [65, 72, 78, 82, 88, 92],
  },
};

export function AIAnalytics() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI System Analytics</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Brain size={24} color="#7C3AED" />
          <Text style={styles.metricValue}>{MOCK_DATA.userSatisfaction}%</Text>
          <Text style={styles.metricLabel}>User Satisfaction</Text>
        </View>

        <View style={styles.metricCard}>
          <TrendingUp size={24} color="#10B981" />
          <Text style={styles.metricValue}>{MOCK_DATA.conflictResolution}%</Text>
          <Text style={styles.metricLabel}>Conflict Resolution</Text>
        </View>

        <View style={styles.metricCard}>
          <Users size={24} color="#3B82F6" />
          <Text style={styles.metricValue}>
            {MOCK_DATA.activeUsers.toLocaleString()}
          </Text>
          <Text style={styles.metricLabel}>Active Users</Text>
        </View>

        <View style={styles.metricCard}>
          <AlertTriangle size={24} color="#F59E0B" />
          <Text style={styles.metricValue}>{MOCK_DATA.potentialIssues}</Text>
          <Text style={styles.metricLabel}>Potential Issues</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>User Satisfaction Trend</Text>
        <LineChart
          data={{
            labels: MOCK_DATA.trends.labels,
            datasets: [
              {
                data: MOCK_DATA.trends.datasets,
              },
            ],
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
        <View style={styles.recommendation}>
          <Text style={styles.recommendationText}>
            Implement additional user onboarding steps to improve initial engagement
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Text style={styles.recommendationText}>
            Enhance conflict resolution system with more automated responses
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Text style={styles.recommendationText}>
            Add proactive notifications for potential service issues
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 24,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  recommendationsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  recommendation: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 24,
  },
});