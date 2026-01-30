import {
  Modal,
  Stack,
  Group,
  Text,
  Title,
  ScrollArea,
  CopyButton,
  ActionIcon,
} from '@mantine/core'
import { IconCopy, IconCheck } from '@tabler/icons-react'
import type { MappedData } from '@widget/useGridData/types'

export type JsonModalData = {
  mapped: MappedData | null
  raw: any[]
} | null

interface JsonModalProps {
  opened: boolean
  onClose: () => void
  data: JsonModalData
}

export function JsonModal({ opened, onClose, data }: JsonModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      title={<Title order={3}>Bekijk JSON</Title>}
      overlayProps={{ opacity: 0.55, blur: 2 }}
      size="auto"
      /** Override internal CSS variable so content can stretch */
      styles={{
        content: {
          '--modal-size': 'calc(100vw - 4rem)',
          padding: 0,
          width: 'calc(100vw - 4rem)',
          maxWidth: '1600px',
          height: 'calc(100vh - 4rem)',
          margin: '2rem auto',
          display: 'flex',
          flexDirection: 'column',
        } as any,
        body: {
          padding: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        header: {
          padding: '1.25rem 1.5rem',
        },
      }}
    >
      {data ? (
        <div
          style={{
            // inner padding container (scales down for small screens)
            margin: '1.25rem 1.5rem',
            height: 'calc(100% - 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack gap="lg" style={{ flex: 1, minHeight: 0 }}>
            {/* Raw data section */}
            <Stack gap="xs" style={{ flex: 1, minHeight: 0 }}>
              <Group justify="space-between">
                <Text size="lg" fw="bold">
                  Resultaat van SparQL query
                </Text>
                <CopyButton value={JSON.stringify(data.raw, null, 2)} timeout={2500}>
                  {({ copied, copy }) => (
                    <ActionIcon
                      onClick={copy}
                      variant={copied ? 'filled' : 'default'}
                      color={copied ? 'teal' : undefined}
                      aria-label="Copy raw JSON"
                    >
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Group>
              <ScrollArea offsetScrollbars style={{ flex: 1 }}>
                <pre style={{ fontSize: 12, lineHeight: '16px', margin: 0 }}>
                  {JSON.stringify(data.raw, null, 2)}
                </pre>
              </ScrollArea>
            </Stack>

            {/* Mapped data section */}
            <Stack gap="xs" style={{ flex: 1, minHeight: 0 }}>
              <Group justify="space-between">
                <Text size="lg" fw="bold">
                  Geprepareerde data voor gebruik in de widget
                </Text>
                <CopyButton value={JSON.stringify(data.mapped, null, 2)} timeout={2500}>
                  {({ copied, copy }) => (
                    <ActionIcon
                      onClick={copy}
                      variant={copied ? 'filled' : 'default'}
                      color={copied ? 'teal' : undefined}
                      aria-label="Copy mapped JSON"
                    >
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Group>
              <ScrollArea offsetScrollbars style={{ flex: 1 }}>
                <pre style={{ fontSize: 12, lineHeight: '16px', margin: 0 }}>
                  {JSON.stringify(data.mapped, null, 2)}
                </pre>
              </ScrollArea>
            </Stack>
          </Stack>
        </div>
      ) : (
        <Text size="sm">Geen data beschikbaar.</Text>
      )}
    </Modal>
  )
}
