'use client';
import axiosClient from '@/features/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { mapMainSectionWidgetData } from '../helpers/mapMainSectionWidgetData';
import { WIDGET_SUB_TYPES, WidgetSubType } from '../types/mainWidgetData';
import { mapAgentWidgetData } from '../helpers/mapAgentWidgeData';
import { mapWorkForAgentData } from '../helpers/mapWorksForAgentData';
import { mapCategoriesData } from '../helpers/mapCategoriesData';
import { mapManifistationsData } from '../helpers/mapManifistationsData';

export async function queryWidgetByIri(iri: string, type: WidgetSubType) {
  let response;
  let rawData;

  switch (type) {
    case WIDGET_SUB_TYPES.work:
      response = await axiosClient.get(`/works/run?work=${iri}`);
      rawData = response.data?.[0];
      return mapMainSectionWidgetData(rawData);
    case WIDGET_SUB_TYPES.category:
      response = await axiosClient.get(`/categories/run?category=${iri}`);
      return mapCategoriesData(response.data);
    case WIDGET_SUB_TYPES.worksForAgent:
      response = await axiosClient.get(`/works-for-agents/run?agent=${iri}`);
      return mapWorkForAgentData(response.data);
    case WIDGET_SUB_TYPES.agent:
      response = await axiosClient.get(`/agents/run?agent=${iri}`);
      rawData = response.data?.[0];
      return mapAgentWidgetData(rawData);
    case WIDGET_SUB_TYPES.manifestation:
      // TODO in future when we will support more started type then work, add parent type, for minification related to work or to agent
      response = await axiosClient.get(`/manifestations/run?work=${iri}`);
      return mapManifistationsData(response.data);
    default:
      throw new Error('Unsupported type');
  }
}

export function useWidgetByIri(iri: string, type: WidgetSubType) {
  const queryFn = async () => {
    const result = await queryWidgetByIri(iri, type);
    if (result.error) {
      throw new Error('Error fetching widget data');
    }
    return result.mappedData;
  };

  return useQuery({
    queryKey: [`widget-by-uri-${iri}-${type}`, iri, type],
    queryFn,
    retry: 5,
    retryDelay: 1000,
  });
}
